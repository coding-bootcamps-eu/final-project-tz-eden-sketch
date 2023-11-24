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
        class="tooltip"
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
        <div class="icon-wrapper">
          <button class="todo-btn btn">
            <q-icon class="todo-icon" name="svguse:/icons.svg#gloves"></q-icon>
          </button>

          <button class="harvest-btn btn">
            <q-icon
              class="harvest-icon"
              name="bi-basket"
              size="3ch"
              @click="openHarvestDialog(set)"
            ></q-icon>
          </button>

          <q-dialog v-model="confirmHarvestSet" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar
                  icon="svguse:/icons.svg#soil-and-shovel"
                  color="warning"
                  text-color="white"
                />
                <span class="q-ml-sm"
                  >Willst du den Satz "{{ plantsStore.getVariety(state.activeSetVarietyId).name }}"
                  ernten?<br />In diesem Fall wird die Zeit im Beet für den Satz verkürzt. In der
                  Zeit davor bleibt der Satz im Beet.</span
                >
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Zurück" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="Ernten"
                  color="warning"
                  v-close-popup
                  @click="harvestSet(state.activeSetId, props.bedNumber)"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <button class="delete-btn btn">
            <q-icon
              class="delete-icon"
              name="delete"
              size="3ch"
              @click="openDeleteDialog(set)"
            ></q-icon>
          </button>

          <q-dialog v-model="confirmDeleteSet" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar
                  icon="svguse:/icons.svg#soil-and-shovel"
                  color="warning"
                  text-color="white"
                />
                <span class="q-ml-sm"
                  >Willst du den Satz "{{ plantsStore.getVariety(state.activeSetVarietyId).name }}"
                  wirklich löschen?<br />Der Satz wird in diesem Fall komplett von Anfang bis Ende
                  aus dem Beet entfernt.</span
                >
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Zurück" color="primary" v-close-popup />
                <q-btn
                  flat
                  label="Löschen"
                  color="warning"
                  v-close-popup
                  @click="deleteSet(state.activeSetId, props.bedNumber)"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { usePlantsStore } from '@/stores/usePlantsStore'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
import { RouterLink } from 'vue-router'

const plantBedsStore = usePlantBedsStore()
const plantsStore = usePlantsStore()

const confirmDeleteSet = ref(false)
const confirmHarvestSet = ref(false)

const state = reactive({
  activeSetId: '',
  activeSetVarietyId: '',
  bedId: ''
})

const props = defineProps({
  bedNumber: Number
})

function loadImage(imageName) {
  return new URL(`/src/assets/images/${imageName}`, import.meta.url).href
}

function setActiveSet(set) {
  let currentBed = null
  for (let i = 0; i < plantBedsStore.state.activeSets.length; i++) {
    if (plantBedsStore.state.activeSets[i].bedNumber === props.bedNumber) {
      currentBed = plantBedsStore.state.activeSets[i]
      state.bedId = props.bedNumber
    }
  }

  if (currentBed !== null) {
    //es gibt schon ein active Set für dieses Beet
    //setzte neues actives Set für dieses Beet
    currentBed.setId = set.id
    state.activeSetId = set.id
    state.activeSetVarietyId = set.plantvarietiesId
  } else {
    //es gibt noch kein activeSet für dieses Beet
    //neu anlegen
    const bed = { bedNumber: props.bedNumber, setId: set.id }
    plantBedsStore.state.activeSets.push(bed)
    state.activeSetId = set.id
    state.activeSetVarietyId = set.plantvarietiesId
  }
}
function openDeleteDialog(set) {
  setActiveSet(set)
  confirmDeleteSet.value = true
}
function openHarvestDialog(set) {
  setActiveSet(set)
  confirmHarvestSet.value = true
}

function deleteSet(setId, bedNumber) {
  plantBedsStore.deleteSet(setId, bedNumber)
  confirmDeleteSet.value = false
}

function harvestSet(setId, bedNumber) {
  plantBedsStore.harvestSet(setId, bedNumber)
  confirmHarvestSet.value = false
}
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
@media screen and (max-width: 600px) {
  .bed {
    width: 70%;
    max-width: 100%;
    max-height: 75vh;
    aspect-ratio: 1/1.85;
  }
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
  box-shadow: 0 0 6px 5px var(--clr-dark-darker);
  background-color: var(--clr-info-lighter);
}
.set-content-wrapper {
  padding-block: 1rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-content: center;
  align-content: center;
  gap: 4rem;
  height: 100%;
}
.image-wrapper {
  margin-top: 1rem;
  width: 95%;
  display: flex;
  justify-content: center;
  margin-bottom: auto;
  height: 30%;
}
.icon-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2.5rem;
}
.tooltip-img-wrapper {
  height: 8rem;
}

.tooltip {
  padding: 1.5rem;
  width: max-content;
  height: max-content;
  max-width: 250px;
  max-height: 500px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  offset-anchor: center;
  visibility: hidden;
  z-index: 1;
  font-size: 1rem;
  background-color: var(--clr-info-lighter);
  border-radius: 10px;
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
  color: var(--clr-primary-darker);
}
.info-text {
  font-weight: 600;
  padding-left: 0.2rem;
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
