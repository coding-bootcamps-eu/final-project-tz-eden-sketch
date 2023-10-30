<template>
  <header>
    <PlantBedNavigation></PlantBedNavigation>
  </header>

  <main>
    <!-- <p><pre>
      Beetplan: {{ plantBedsStore.state.currentBedplan.beds }}
    </pre></p> -->

    <section>
      <h2>Beet 1</h2>
      <p>noch freie Spalten: {{ plantBedsStore.spaceLeftInCurrentBed[0] }}</p>
      <AddSetToBed :bedNumber="1"></AddSetToBed>
      <MoveSetInBed :bedNumber="1"></MoveSetInBed>

      <!-- <pre>{{
          plantBedsStore.calculateBedState(
            1,
            plantBedsStore.state.currentMonth,
            plantBedsStore.state.currentPeriod
          )
        }}</pre> -->

      <PlantBed :bedNumber="1" />
    </section>
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

<style scoped></style>
