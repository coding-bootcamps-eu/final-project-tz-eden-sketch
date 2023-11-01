<template>
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
          @click="addVarietyToUserList()"
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
        label="Sorten auswählen"
        color="primary"
        v-close-popup
        @click="addVarietyToUserList()"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()

const plantBedsStore = usePlantBedsStore()
const plantsStore = usePlantsStore()
const router = useRouter()

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
  ],
  userVarieties: [],
  rows: [],

  feedback: {
    open: false,
    variety: '',
    message: ''
  }
})

async function mapTableContent() {
  const rows = []

  for (let i = 0; i < plantsStore.state.plantVarieties.length; i++) {
    const currentVariety = plantsStore.state.plantVarieties[i]
    const row = {}
    row.name = currentVariety.name
    row.plantfamily = currentVariety.plantfamily
    row.plantspecies = currentVariety.species
    row.plantvariety = currentVariety.name
    row.nutrition = currentVariety.nutrition
    //extra data
    row.plantspeciesId = currentVariety.plantspeciesId
    row.varietyId = currentVariety.id
    row.cultureDurationIntern = currentVariety.cultureDurationIntern
    row.cultureDuration = currentVariety.cultureDuration
    row.rowDistance = currentVariety.rowDistance
    // row.goodNeighbors = species.goodNeighbors
    // row.badNeighbors = species.badNeighbors
    rows.push(row)
  }

  return rows
}

function addVarietyToUserList() {
  state.userVarieties = []
  plantBedsStore.state.currentUserVarieties = []

  for (let i = 0; i < plantsStore.state.plantVarieties.length; i++) {
    for (let j = 0; j < state.selected.length; j++) {
      console.log(plantsStore.state.plantVarieties[i].id)
      console.log(state.selected[j].varietyId)
      if (plantsStore.state.plantVarieties[i].id === state.selected[j].varietyId) {
        console.log('treffer')
        state.userVarieties.push(plantsStore.state.plantVarieties[i].id)
        plantBedsStore.state.currentUserVarieties.push(plantsStore.state.plantVarieties[i].id)
      }
    }
  }
  console.log(plantBedsStore.state.currentUserVarieties)
  addNewBedplan()
}

const props = defineProps(['formTitle', 'formValue'])

async function addNewBedplan() {
  const newBedId = await plantBedsStore.addBedplan(
    userStore.state.currentUser.id,
    props.formTitle,
    props.formValue,
    // form.value.title,
    // form.value.description,
    plantBedsStore.state.currentUserVarieties
  )

  router.push({ name: 'plantbed-edit', params: { bedId: newBedId } })
}

onMounted(async () => {
  state.rows = await mapTableContent()
})
</script>

<style scoped>
.add-plants__card {
  width: 1000px;
}

.btn-add {
  margin-left: 3rem;
}
</style>
