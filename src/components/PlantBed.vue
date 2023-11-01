<template>
  <div class="bed">
    <div
      v-for="set of plantBedsStore.calculateBedState(
        props.bedNumber,
        plantBedsStore.state.currentMonth,
        plantBedsStore.state.currentPeriod
      )[1]"
      :key="set.id"
      class="set"
      :class="{ active: state.activeSetId === set.id }"
      :style="`--neededColums: ${set.neededColums}; --startColum:${set.startColum + 1}`"
      @click="setActiveSet(set)"
    >
      <q-tooltip class="bg-secondary text-black" anchor="center middle" self="center middle">
        <p>{{ plantsStore.getVariety(set.plantvarietiesId)[0].name }}</p>
        <p>{{ plantsStore.getVariety(set.plantvarietiesId)[0].species }}</p>
      </q-tooltip>

      <div class="set-content-wrapper">
        <div class="image-wrapper">
          <div v-if="plantsStore.getVariety(set.plantvarietiesId).length === 0">...</div>
          <img
            v-else
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
        <!-- <span
          >start: {{ set.startColum }},<br />
          Ende: {{ set.startColum + set.neededColums }},<br />
          Spalten: {{ set.neededColums }}
        </span> -->
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
import { reactive } from 'vue'
import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'

const plantBedsStore = usePlantBedsStore()
const plantsStore = usePlantsStore()

const state = reactive({
  activeSetId: ''
})

const props = defineProps({
  bedNumber: Number
})

function loadImage(imageName) {
  return new URL(`/src/assets/images/${imageName}`, import.meta.url).href
}

function setActiveSet(set) {
  // const currentBed = plantBedsStore.state.activeSets.find(
  //   (bedItem) => bedItem['bedNumber'] === props.bedNumber
  // )
  //setzte actives Set für dieses Beet
  // currentBed.set = set
  plantBedsStore.state.activeSet = set
  state.activeSetId = set.id
}

// onUpdated(async () => {

// })
</script>

<style scoped>
.bed {
  margin: 0 auto;
  width: 300px;
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
  --neededColums: 0;
  --startColum: 0;
  height: 100%;
  background-color: var(--clr-info);
  grid-column: var(--startColum) / span var(--neededColums);
  grid-row-start: 1;
  border-radius: 5px;
}

.active {
  border: 2px solid var(--clr-secondary);
}
.set-content-wrapper {
  padding-block: 1rem;
  /*padding-inline: 0.5rem;*/
  display: grid;
  /* justify-content: end; */
  align-items: center;
  gap: 4rem;
  height: 100%;
}
.image-wrapper {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: auto;
}
.variety-image {
  object-fit: contain;
  width: 100%;
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
