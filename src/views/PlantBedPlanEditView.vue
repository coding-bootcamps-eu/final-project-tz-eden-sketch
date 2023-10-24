<template>
  <header>
    <PlantBedNavigation></PlantBedNavigation>
  </header>

  <main>
    <!-- <p><pre>
      Beetplan: {{ plantBedsStore.state.currentBedplan.beds }}
    </pre></p> -->

    <h2>Beet 1</h2>
    <q-btn class="btn-add" color="primary" icon="add" @click="state.openAddPlant = true" />

    <q-dialog maximized class="popup-plant add-plants__card" v-model="state.openAddPlant">
      <!-- 'full-width' für desktop, 'maximized' für mobile-->
      <q-card>
        <q-card-section>
          <div class="text-h6">Wähle deine Sorten aus:</div>
        </q-card-section>

        <q-card-section class="user-species-list">
          <q-table
            :rows="state.rows"
            :columns="state.columns"
            row-key="name"
            selection="multiple"
            v-model:selected="state.selected"
            :filter="state.filter"
            grid
            hide-header
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
            label="Sorte einpflanzen"
            color="primary"
            v-close-popup
            @click="addVarietyToBed(1, plantBedsStore.calculateStartColumsInBed()[0])"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <pre>{{
      plantBedsStore.calculateBedState(
        1,
        plantBedsStore.state.currentMonth,
        plantBedsStore.state.currentPeriod
      )
    }}</pre>
    <div class="bed">
      <div
        v-for="set of plantBedsStore.calculateBedState(
          1,
          plantBedsStore.state.currentMonth,
          plantBedsStore.state.currentPeriod
        )[1]"
        :key="set.plantvarietiesId"
        class="set"
        :style="`--neededColums: ${set.neededColums}; --startColum:${set.startColum + 1}`"
      >
        <div class="set-image"></div>
        <p>{{ set.plantvarietiesId }}</p>
        <p>
          {{ plantsStore.getVariety('22fa677e-a15f-4eeb-94ad-373f2499a0e8')[0].name }}
        </p>
        <!-- <p>{{ set.plantvarietiesId }}</p> -->
      </div>
    </div>
  </main>
  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<script setup>
import PlantBedNavigation from '../components/PlantBedNavigation.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'
import { computed, reactive, onBeforeMount } from 'vue'
import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'

import { useRoute } from 'vue-router'
const route = useRoute()

const plantBedsStore = usePlantBedsStore()
const plantsStore = usePlantsStore()

const state = reactive({
  openAddPlant: false,
  filter: '',
  selected: [],
  columns: [
    { name: 'plantspecies', align: 'center', label: 'Art', field: 'plantspecies', sortable: true },
    { name: 'plantfamily', label: 'Pflanzenfamilie', field: 'plantfamily', sortable: true },
    { name: 'plantvariety', label: 'Sorte', field: 'plantvariety' },
    { name: 'nutrition', label: 'Nährstoffbedarf', field: 'nutrition' }
    // { name: 'goodNeighbors', label: 'gute Nachbarn', field: 'goodNeighbors' },
    // { name: 'badNeighbors', label: 'schlechte Nachbarn', field: 'badNeighbors' }
  ],
  rows: []
})

// watch(
//   () => state.userVarieties,
//   (newVal, oldVal) => {
//     state.rows = mapTableContent()
//   }
// )

async function mapTableContent() {
  const rows = []

  for (let i = 0; i < plantBedsStore.state.currentBedplan.userVarieties.length; i++) {
    const currentUserVarietyId = plantBedsStore.state.currentBedplan.userVarieties[i]
    // console.log(plantBedsStore.getVariety(currentUserVarietyId)[0])

    const URL = `http://localhost:3000/plantvarieties/${currentUserVarietyId}?_embed=plantspeciesId` //todo: besser aus userStore holen??
    const resp = await fetch(URL)
    const currentUserVariety = await resp.json()

    //const currentUserVariety = await plantBedsStore.getVariety(currentUserVarietyId)[0]
    // const species = plantsStore.getSpecies(userVarieties[varietyItem].plantspeciesId)
    // console.log('currentUserVariety ', currentUserVariety)
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
  //console.log('alle rows ', rows)
  return rows
}

function addVarietyToBed(bedNumber, startColum) {
  let newSets = state.selected
  for (let i = 0; i < newSets.length; i++) {
    if (
      plantBedsStore.checkIfAddSetPossible(
        bedNumber,
        plantBedsStore.currentMonth,
        plantBedsStore.currentPeriod,
        newSets[i].varietyId,
        startColum,
        newSets[i].cultureDurationIntern,
        newSets[i].rowDistance
      )
    ) {
      //Satz kann ins Beet eingepflanzt werden
      console.log('newSet: ', i)

      plantBedsStore.addSet(
        bedNumber,
        plantBedsStore.currentMonth,
        plantBedsStore.currentPeriod,
        newSets[i].varietyId,
        startColum,
        newSets[i].cultureDurationIntern,
        newSets[i].rowDistance
      )
    } else {
      //Satz kann nicht eingepflanzt werden
      //todo: Nutzer Feedback geben
      console.log('Sorte kann nicht eingepflanzt werden')
    }
  }
  state.selected = []
}

onBeforeMount(async () => {
  await plantBedsStore.loadBedplan(route.params.bedId)
  state.rows = await mapTableContent()
})
</script>

<style scoped>
.btn-add {
  margin-left: 3rem;
}
.add-plants__card {
  width: 1000px;
}
.bed {
  margin: 0 auto;
  width: 200px;
  aspect-ratio: 1.2/2.5;
  background-color: var(--clr-dark);
  border-radius: 5px;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: 1fr;
  gap: 0.25rem;
}
.set {
  --neededColums: 4;
  --startColum: 3;
  height: 100%;
  background-color: var(--clr-info);
  grid-column: var(--startColum) / span var(--neededColums);
  grid-row-start: 1;
  border-radius: 5px;
}
</style>
