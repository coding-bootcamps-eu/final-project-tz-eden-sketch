<template>
  <header>
    <PlantBedNavigation></PlantBedNavigation>
  </header>

  <main>
    <!-- <p><pre>
      Beetplan: {{ plantBedsStore.state.currentBedplan.beds }}
    </pre></p> -->

    <h2>Beet 1</h2>
    <p>noch freie Spalten: {{ plantBedsStore.spaceLeftInCurrentBed[0] }}</p>

    <!-- <pre>{{
      plantBedsStore.calculateBedState(
        1,
        plantBedsStore.state.currentMonth,
        plantBedsStore.state.currentPeriod
      )
    }}</pre> -->
    <AddSetToBed :bedNumber="1"></AddSetToBed>
    <PlantBed />
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
import PlantBed from '@/components/PlantBed.vue'
import AddSetToBed from '@/components/AddSetToBed.vue'

import { useRoute } from 'vue-router'
const route = useRoute()

const plantBedsStore = usePlantBedsStore()
const plantsStore = usePlantsStore()

onBeforeMount(async () => {
  await plantBedsStore.loadBedplan(route.params.bedId)
})
</script>

<style scoped></style>
