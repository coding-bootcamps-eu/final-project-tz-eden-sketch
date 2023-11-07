<template>
  <q-btn class="btn-add" color="primary" icon="add" @click="state.openAddPlant = true" dense />

  <q-dialog maximized class="popup-plant add-plants__card" v-model="state.openAddPlant">
    <!-- 'full-width' für desktop, 'maximized' für mobile-->
    <q-card>
      <q-toolbar class="bg-primary text-white">
        <div class="text-h6">Wähle deine Sorten aus:</div>
        <q-space></q-space>
        <q-card-actions align="right">
          <q-btn
            flat
            label="Sorte einpflanzen"
            color="primary bg-secondary"
            v-close-popup
            @click="addVarietyToBed(props.bedNumber)"
          />
          <q-btn flat icon="close" color="white" class="bg-secondary" v-close-popup />
        </q-card-actions>
      </q-toolbar>

      <q-card-section class="user-species-list">
        <q-table
          :rows="state.rows"
          :columns="state.columns"
          row-key="name"
          selection="multiple"
          v-model:selected="state.selected"
          :filter="state.filter"
          rows-per-page-label="Sorten pro Seite"
          :rows-per-page-options="[0, 5, 10, 25, 50]"
          :grid="$q.screen.lt.md"
        >
          <!-- grid
            hide-header-->
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="state.filter" placeholder="Suche">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:item="props">
            <div
              class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
              :style="props.selected ? 'transform: scale(0.95);' : ''"
            >
              <q-card
                bordered
                flat
                :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''"
              >
                <q-card-section>
                  <q-checkbox dense v-model="props.selected" :label="props.row.name" />
                </q-card-section>
                <q-separator />
                <q-list dense>
                  <q-item
                    v-for="col in props.cols.filter((col) => col.name !== 'desc')"
                    :key="col.name"
                  >
                    <q-item-section>
                      <q-item-label>{{ col.label }}</q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-item-label caption>{{ col.value }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </template>
        </q-table>
      </q-card-section>

      <!-- <q-card-section>{{ state.userVarieties }} </q-card-section> -->
      <q-card-actions align="right">
        <q-btn flat label="Zurück" color="warning" v-close-popup />
        <q-btn
          flat
          label="Sorte einpflanzen"
          color="primary"
          v-close-popup
          @click="addVarietyToBed(props.bedNumber)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <InfoModal :open="state.feedback.open" :message="state.feedback.message"></InfoModal>
  <!-- :type="warning" -->
</template>

<script setup>
import { reactive, onUpdated } from 'vue'
import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
import InfoModal from '@/components/InfoModal.vue'

const plantBedsStore = usePlantBedsStore()
const plantsStore = usePlantsStore()

const props = defineProps({
  bedNumber: Number
})

const state = reactive({
  openAddPlant: false,
  filter: '',
  selected: [],
  columns: [
    { name: 'plantspecies', align: 'center', label: 'Art', field: 'plantspecies', sortable: true },
    { name: 'plantfamily', label: 'Pflanzenfamilie', field: 'plantfamily', sortable: true },
    { name: 'plantvariety', label: 'Sorte', field: 'plantvariety' },
    { name: 'nutrition', label: 'Nährstoffbedarf', field: 'nutrition' },
    { name: 'rowDistance', label: 'Reihenabstand', field: 'rowDistance' },
    { name: 'cultureDurationIntern', label: 'Kulturdauer INTERN', field: 'cultureDurationIntern' } //todo: später durch cultureDuration ersetzen
    // { name: 'goodNeighbors', label: 'gute Nachbarn', field: 'goodNeighbors' },
    // { name: 'badNeighbors', label: 'schlechte Nachbarn', field: 'badNeighbors' }
  ],
  rows: [],

  feedback: {
    open: false,
    variety: '',
    message: ''
  }
})

async function mapTableContent() {
  const rows = []

  for (let i = 0; i < plantBedsStore.state.currentBedplan.userVarieties.length; i++) {
    const currentUserVarietyId = plantBedsStore.state.currentBedplan.userVarieties[i]
    const currentUserVariety = plantsStore.getVariety(currentUserVarietyId)
    // console.log(currentUserVariety)

    // const URL = `http://localhost:3000/plantvarieties/${currentUserVarietyId}?_embed=plantspeciesId` //todo: besser aus userStore holen??
    // const resp = await fetch(URL)
    // const currentUserVariety = await resp.json()

    const row = {}
    row.name = currentUserVariety.name
    row.plantfamily = currentUserVariety.plantfamily
    row.plantspecies = currentUserVariety.species
    row.plantvariety = currentUserVariety.name
    row.nutrition = currentUserVariety.nutrition
    //extra data
    row.plantspeciesId = currentUserVariety.plantspeciesId
    row.varietyId = currentUserVariety.id
    row.cultureDurationIntern = currentUserVariety.cultureDurationIntern
    row.cultureDuration = currentUserVariety.cultureDuration
    row.rowDistance = currentUserVariety.rowDistance
    // row.goodNeighbors = species.goodNeighbors
    // row.badNeighbors = species.badNeighbors

    rows.push(row)
  }

  return rows
}

async function addVarietyToBed() {
  let newSets = state.selected
  for (let i = 0; i < newSets.length; i++) {
    //wähle erste verfügbare Position um Set in Beet einzupflanzen
    const startColum = plantBedsStore.calculateStartColumsInBed(
      props.bedNumber,
      plantBedsStore.state.currentMonth,
      plantBedsStore.state.currentPeriod,
      newSets[i].varietyId,
      newSets[i].cultureDurationIntern,
      newSets[i].rowDistance
    )

    if (startColum.length === 0) {
      console.log('kein platz mehr im Beet')
      state.feedback.variety = state.feedback.message =
        'Der Satz "' +
        newSets[i].name +
        '" (' +
        newSets[i].varietyId +
        ') den du einpflanzen möchtest hat leider keinen Platz im Beet bis zur Ernte. '

      state.feedback.open = true
      setTimeout(() => {
        state.feedback.open = false
      }, 3000)
      break
    }

    //todo: Funktion checkIfAddSetPossible wird auch schon in calculateStartColumsInBed aufgerufen
    //todo: Aufruf daher hier notwendig????
    const checkAddSetPossible = plantBedsStore.checkIfAddSetPossible(
      props.bedNumber,
      plantBedsStore.state.currentMonth,
      plantBedsStore.state.currentPeriod,
      newSets[i].varietyId,
      startColum[0],
      newSets[i].cultureDurationIntern,
      newSets[i].rowDistance
    )

    if (checkAddSetPossible.value) {
      //Satz kann ins Beet eingepflanzt werden

      await plantBedsStore.addSet(
        props.bedNumber,
        plantBedsStore.state.currentMonth,
        plantBedsStore.state.currentPeriod,
        newSets[i].varietyId,
        startColum[0],
        newSets[i].cultureDurationIntern,
        newSets[i].rowDistance
      )
    } else {
      //Satz kann nicht eingepflanzt werden
      //todo: Nutzer Feedback geben
      console.log('Sorte kann nicht eingepflanzt werden')
      console.log(checkAddSetPossible.type, ': ', checkAddSetPossible.message)
    }
  }
  state.selected = []
}

onUpdated(async () => {
  state.rows = await mapTableContent()
})
</script>

<style scoped>
.add-plants__card {
  width: 1000px;
}

.btn-add {
  height: 3rem;
  width: 3rem;
  align-self: center;
  margin-right: 1rem;
  margin-left: 3rem;
}
</style>
