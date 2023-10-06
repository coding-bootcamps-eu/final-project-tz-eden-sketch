<template>
  <header>
    <PlantBedNavigation></PlantBedNavigation>
    <!--Monats auswahl-->
    <!-- Zeit Auswahl-->
  </header>
  <main>
    <!--Beet 1-->
    <p>{{ plantBedsStore.state.currentMonth }}</p>
    <p>{{ plantBedsStore.state.currentPeriod }}</p>

    <h2>Beet 1</h2>
    <q-btn class="btn-add" color="primary" icon="add" @click="openAddPlant = true" />

    <q-dialog maximized class="popup-plant add-plants__card" v-model="openAddPlant">
      <!-- 'full-width' für desktop, 'maximized' für mobile-->
      <q-card>
        <q-card-section>
          <div class="text-h6">Wähle deine Sorten aus:</div>
        </q-card-section>

        <q-card-section class="user-species-list">
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="name"
            selection="multiple"
            v-model:selected="selected"
            :filter="filter"
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

        <q-card-section>{{ plantsStore.getAllSpecies() }} </q-card-section>
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
import { ref } from 'vue'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
import { usePlantsStore } from '@/stores/usePlantsStore'
const plantsStore = usePlantsStore()
const plantBedsStore = usePlantBedsStore()

const openAddPlant = ref(false)

// const userSpecies

// function addPlant() {}
// console.log(plantsStore.getAllSpecies())
const filter = ref('')
const selected = ref([])
const columns = ref([
  { name: 'plantspecies', align: 'center', label: 'Art', field: 'plantspecies', sortable: true },
  { name: 'plantfamily', label: 'Pflanzenfamilie', field: 'plantfamily', sortable: true },
  { name: 'plantvariety', label: 'Sorte', field: 'plantvariety' },
  { name: 'nutrition', label: 'Nährstoffbedarf', field: 'nutrition' },
  { name: 'goodNeighbors', label: 'gute Nachbarn', field: 'goodNeighbors' },
  { name: 'badNeighbors', label: 'schlechte Nachbarn', field: 'badNeighbors' }
])

const rows = ref([
  {
    name: 'MeineSorte',
    plantspecies: 'Apfel',
    plantvariety: 'Oxhella',
    nutrition: 'mittel',
    goodNeighbors: 'Spinat, Brokoli, Tomate',
    badNeighbors: ['Spinat', 'Brokoli', 'Tomate']
  }
])
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
