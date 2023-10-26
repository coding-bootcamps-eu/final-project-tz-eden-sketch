<template>
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
        {{ plantsStore.getVariety(set.plantvarietiesId)[0].name }}
      </p>
      <!-- <p>{{ set.plantvarietiesId }}</p> -->
    </div>
  </div>
</template>
<script setup>
import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'

const plantBedsStore = usePlantBedsStore()
const plantsStore = usePlantsStore()
</script>

<style scoped>
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
