<template>
  <div class="bed">
    <div
      v-for="set of plantBedsStore.calculateBedState(
        props.bedNumber,
        plantBedsStore.state.currentMonth,
        plantBedsStore.state.currentPeriod
      )[1]"
      :key="set.plantvarietiesId"
      class="set"
      :style="`--neededColums: ${set.neededColums}; --startColum:${set.startColum + 1}`"
    >
      <!-- <q-tooltip class="bg-secondary text-black" anchor="center middle" self="center middle">
        <p>{{ plantsStore.getVariety(set.plantvarietiesId)[0].name }}</p>
        <p></p>
      </q-tooltip> -->

      <div class="set-content-wrapper">
        <div class="set-image">
          <img
            class="variety-image"
            :src="loadImage(plantsStore.getVariety(set.plantvarietiesId)[0].imagename)"
          />
        </div>
        <button class="todo-btn btn">
          <q-icon class="todo-icon" name="svguse:/icons.svg#gloves"></q-icon>
        </button>
        <button class="harvest-btn btn">
          <q-icon
            class="harvest-icon"
            name="bi-basket"
            size="3ch"
            @click="plantBedsStore.harvestSet(set.id, props.bedNumber)"
          ></q-icon>
        </button>
        <button class="delete-btn btn">
          <q-icon
            class="delete-icon"
            name="delete"
            size="3ch"
            @click="plantBedsStore.deleteSet(set.id, props.bedNumber)"
          ></q-icon>
        </button>
        <span
          >start: {{ set.startColum }},<br />
          Ende: {{ set.startColum + set.neededColums }},<br />
          Spalten: {{ set.neededColums }}
        </span>
      </div>
      <!-- <p>{{ set.plantvarietiesId }}</p> -->
      <!-- <p>
        {{ plantsStore.getVariety(set.plantvarietiesId)[0].name }}
      </p> -->
      <!-- <p>{{ set }}</p> -->
    </div>
  </div>
</template>

<script setup>
// import { computed } from 'vue'
import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'

const plantBedsStore = usePlantBedsStore()
const plantsStore = usePlantsStore()

const props = defineProps({
  bedNumber: Number
})

function loadImage(imageName) {
  return new URL(`/src/assets/images/${imageName}`, import.meta.url).href
}

// const imageUrl = computed((imageName) => {
//   return new URL(`/src/assets/images/${imageName}`, import.meta.url).href
// })
</script>

<style scoped>
.bed {
  margin: 0 auto;
  width: 600px; /*200px;*/
  /* aspect-ratio: 1.2/2.5; */
  background-color: var(--clr-dark);
  border-radius: 5px;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: 1fr;
  gap: 0.25rem;
}
.set {
  --neededColums: 0;
  --startColum: 0;
  height: 100%;
  background-color: var(--clr-info);
  grid-column: var(--startColum) / span var(--neededColums);
  grid-row-start: 1;
  border-radius: 5px;
}
.set-content-wrapper {
  padding-block: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 4rem;
  height: 100%;
}
.set-image {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: auto;
}
.variety-image {
  object-fit: contain;
  width: 2rem;
}

.todo-icon,
.harvest-icon,
.delete-icon {
  width: 1.75rem;
  height: 1.75rem;
  color: var(--clr-dark);
}
.todo-icon:hover,
.harvest-icon:hover,
.delete-icon:hover {
  color: var(--clr-primary);
}

.btn {
  background-color: transparent;
  border: none;
}
</style>
