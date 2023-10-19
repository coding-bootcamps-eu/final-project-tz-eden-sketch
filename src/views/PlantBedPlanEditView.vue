<template>
  <header>
    <PlantBedNavigation></PlantBedNavigation>
  </header>

  <main>
    <p>{{ plantBedsStore.translateTime('märz', 'ende') }}</p>
    <p>{{ plantBedsStore.currentTime }}</p>

    <!--Beet 1-->
    <p>{{ plantBedsStore.calculateBedState(1, 'februar', 'mitte') }}</p>

    <p>{{ plantBedsStore.state.currentMonth }}</p>
    <p>{{ plantBedsStore.state.currentPeriod }}</p>

    <h2>Beet 1</h2>
    <!-- <p style="color: red">{{ state.rows }}</p> -->
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
          >
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Suche">
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
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="bed"></div>
  </main>
  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<script setup>
import PlantBedNavigation from '../components/PlantBedNavigation.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'
import { computed, reactive } from 'vue'
//import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'

const plantBedsStore = usePlantBedsStore()
//const plantsStore = usePlantsStore()

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
  // userVarieties: computed(() => {
  //   return plantsStore.getAllVarieties
  // }),
  rows: []
  // currentTime: computed(() => {
  //   return plantBedsStore.translateTime(
  //     plantBedsStore.state.currentMonth,
  //     plantBedsStore.state.currentPeriod
  //   )
  // })
})

// watch(
//   () => state.userVarieties,
//   (newVal, oldVal) => {
//     state.rows = mapTableContent()
//   }
// )

// function mapTableContent() {
//   const rows = []
//   for (let varietyItem of state.userVarieties) {
//     // console.log(varietyItem)
//     // const species = plantsStore.getSpecies(userVarieties[varietyItem].plantspeciesId)
//     const row = {}
//     row.name = varietyItem.name
//     row.plantfamily = varietyItem.plantfamily
//     row.plantspecies = varietyItem.name
//     row.plantvariety = varietyItem.name
//     row.nutrition = varietyItem.nutrition
//     // row.goodNeighbors = species.goodNeighbors
//     // row.badNeighbors = species.badNeighbors
//     rows.push(row)
//   }
//   return rows
// }
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
  border-radius: 10px;
}
</style>
