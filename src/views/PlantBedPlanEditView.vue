<template>
  <header class="navigation">
    <PlantBedNavigation></PlantBedNavigation>
  </header>

  <main class="main grid-colums">
    <!-- <p><pre>
      Beetplan: {{ plantBedsStore.state.currentBedplan.beds }}
    </pre></p> -->

    <q-card
      v-for="bed in plantBedsStore.state.currentBedplan.beds"
      :key="bed.bedNumber"
      class="section-bed"
    >
      <!-- <q-bar class="section-bed-bar"> </q-bar> -->
      <q-toolbar class="bed-header bg-secondary">
        <h2 class="headline-main bed-headline">Beet {{ bed.bedNumber }}</h2>
        <div class="bed-toolbar">
          <AddSetToBed :bedNumber="bed.bedNumber"></AddSetToBed>
          <MoveSetInBed :bedNumber="bed.bedNumber"></MoveSetInBed>

          <!-- <AddSetToBed :bedNumber="bed.bedNumber" class="btn btn-add"></AddSetToBed>
          <MoveSetInBed :bedNumber="bed.bedNumber" class="btn btn-move"></MoveSetInBed> -->
        </div>
      </q-toolbar>
      <p class="bed-info">
        noch freie Spalten: {{ plantBedsStore.spaceLeftInCurrentBed[bed.bedNumber - 1] }}
      </p>

      <PlantBed :bedNumber="bed.bedNumber" />
    </q-card>
  </main>
  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<script setup>
import PlantBedNavigation from '../components/PlantBedNavigation.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'
import { onBeforeMount } from 'vue'
// import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
import PlantBed from '@/components/PlantBed.vue'
import AddSetToBed from '@/components/AddSetToBed.vue'
import MoveSetInBed from '@/components/MoveSetInBed.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

const plantBedsStore = usePlantBedsStore()
// const plantsStore = usePlantsStore()

onBeforeMount(async () => {
  await plantBedsStore.loadBedplan(route.params.bedId)
})
</script>

<style scoped>
.navigation {
  /* position: fixed; */
}

main {
  margin-top: 5rem;
  padding-inline: 1rem;
  padding-block: 1rem;

  display: grid;
  gap: 0.5rem;
}
.grid-colums {
  grid-template-columns: 1fr;
}

@media screen and (min-width: 700px) {
  .grid-colums {
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (min-width: 1100px) {
  .grid-colums {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.section-bed {
  padding-bottom: 0.5rem;
}
/* .section-bed-bar {
  height: 3rem;
} */
.bed-header {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  /* position: relative; */
  /* padding-inline: 1rem; */

  /* display: flex;
  justify-content: space-between; */
}
.bed-headline {
  font-weight: 500;
  font-size: 2rem;
  padding-left: 0.5rem;
}
.bed-toolbar {
  /* position: absolute;
  top: 0;
  right: 0;
  background-color: lightgray; */

  /* max-width: auto;*/
  /* padding: 0.5rem; */

  display: grid;
  grid-template-columns: 1fr auto;

  /* gap: 0.5rem; */
}

.btn-move {
  grid-column: 2;
}

.btn-add {
}
.bed-info {
  /* grid-row: 2; */
}
</style>
