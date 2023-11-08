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
      <q-card
        class="bg-secondary text-black tooltip"
        anchor="center middle"
        self="center middle"
        max-height="50vh"
        max-width="50vw"
      >
        <div v-if="!plantsStore.getVariety(set.plantvarietiesId)">...</div>
        <div class="tooltip-content" v-else>
          <div class="image-wrapper tooltip-img-wrapper">
            <img
              class="variety-image"
              :src="loadImage(plantsStore.getVariety(set.plantvarietiesId).imagename)"
            />
          </div>
          <div>
            Sorte:
            <RouterLink
              class="info-text"
              :to="{
                name: 'plantvarietyview',
                params: { plantvariety: plantsStore.getVariety(set.plantvarietiesId).id }
              }"
              target="_blank"
            >
              {{ plantsStore.getVariety(set.plantvarietiesId).name }}
            </RouterLink>
          </div>

          <!-- <p>{{ plantsStore.getVariety(set.plantvarietiesId).name }}</p> -->
          <p>
            Art:

            <RouterLink
              class="info-text"
              :to="{
                name: 'plantspeciesview',
                params: {
                  plantspecies: plantsStore.getSpeciesIdFromName(
                    plantsStore.getVariety(set.plantvarietiesId).species
                  )
                }
              }"
              target="_blank"
            >
              {{ plantsStore.getVariety(set.plantvarietiesId).species }}
            </RouterLink>
          </p>
          <p>
            Gepflanzt:
            <span class="plant-time info-text">
              {{ plantBedsStore.translateTimeBack(set.startTime).period }}</span
            >
            <span class="plant-time info-text">
              {{ plantBedsStore.translateTimeBack(set.startTime).month }}</span
            >
          </p>
          <p>
            Ernte:
            <span class="plant-time info-text">
              {{
                plantBedsStore.translateTimeBack(set.startTime + set.cultureDuration).period
              }}</span
            >
            <span class="plant-time info-text">
              {{
                plantBedsStore.translateTimeBack(set.startTime + set.cultureDuration).month
              }}</span
            >
          </p>
        </div>
      </q-card>

      <div class="set-content-wrapper">
        <div class="image-wrapper">
          <div v-if="!plantsStore.getVariety(set.plantvarietiesId)">...</div>
          <img
            v-else
            class="variety-image"
            :src="loadImage(plantsStore.getVariety(set.plantvarietiesId).imagename)"
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
// import {}
import { reactive } from 'vue'
import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
import { RouterLink } from 'vue-router'

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
  // plantBedsStore.state.activeSets= [{bednumber: 1, setId:{id vom set}}, ...]

  // const currentBed = plantBedsStore.state.activeSets.find(
  //   (bedItem) => bedItem['bedNumber'] === props.bedNumber
  // )
  let currentBed = null
  for (let i = 0; i < plantBedsStore.state.activeSets.length; i++) {
    console.log('active-set bedNumber ' + plantBedsStore.state.activeSets[i].bedNumber)
    console.log('props.bedNumber ' + props.bedNumber)
    if (plantBedsStore.state.activeSets[i].bedNumber === props.bedNumber) {
      currentBed = plantBedsStore.state.activeSets[i]
      // return
    }
  }
  console.log('currentBed: ', currentBed)

  if (currentBed !== null) {
    console.log('A')
    //es gibt schon ein active Set für dieses Beet
    //setzte neues actives Set für dieses Beet
    currentBed.setId = set.id
    state.activeSetId = set.id
  } else {
    //es gibt noch kein activeSet für dieses Beet
    //neu anlegen
    console.log('B')
    const bed = { bedNumber: props.bedNumber, setId: set.id }
    plantBedsStore.state.activeSets.push(bed)
    state.activeSetId = set.id
  }

  console.log('state.activeSetId: ', state.activeSetId)
  console.log('plantBedsStore.state.activeSets: ', plantBedsStore.state.activeSets)
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
  border-radius: 10px !important; /*is overwritten by q-card styling if not !important*/
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  grid-template-rows: 1fr;
  gap: 0.25rem;
  position: relative;
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

@media screen and (min-width: 1200px) {
  .set {
    position: relative;
  }
  .tooltip-content {
    font-size: 0.9rem;
  }
}
.active {
  /* border: 2px solid var(--clr-secondary); */
  box-shadow: 0 0 6px 5px var(--clr-dark-darker);
  background-color: var(--clr-info-lighter);
}
.set-content-wrapper {
  padding-block: 1rem;
  /*padding-inline: 0.5rem;*/
  display: grid;
  grid-template-rows: 3fr 1fr 1fr 1fr;
  justify-content: center;
  align-content: center;
  gap: 4rem;
  height: 100%;
}
.image-wrapper {
  margin-top: 0.5rem;
  width: 100%;
  /* border-radius: 50%; */
  display: flex;
  justify-content: center;
  margin-bottom: auto;
  height: 30%;
}

.tooltip-img-wrapper {
  height: 8rem;
}

.tooltip {
  padding: 1rem;
  width: max-content;
  height: max-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  offset-anchor: center;
  visibility: hidden;
  z-index: 1;
  font-size: 1rem;
}
.tooltip-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 300ms ease;
}
.tooltip-content * {
  margin: 0;
}
.info-text {
  font-weight: 600;
}
.plant-time {
  display: inline-block;
}
.plant-time::first-letter {
  text-transform: uppercase;
}
.plant-time + .plant-time {
  padding-left: 0.25rem;
}
.tooltip-content .image-wrapper {
  padding-bottom: 1rem;
}
.set:hover .tooltip {
  visibility: visible;
}

.set:hover .tooltip-content {
  opacity: 100;
}
.variety-image {
  aspect-ratio: 1;
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
