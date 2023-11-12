<template>
  <!-- <q-btn
    class="btn"
    color="primary"
    label="< >"
    @click="plantBedsStore.state.moveSetModusIsActive = true"
  >
  </q-btn> -->
  <div class="toolbar-move-switch">
    <div class="toolbar-wrapper">
      <q-toggle
        class="toggle-slider"
        v-model="plantBedsStore.state.moveSetModusIsActive[props.bedNumber - 1]"
        color="primary"
        label="Set verschieben"
        right-label
        :disable="!isSetActive"
      >
      </q-toggle>

      <div class="move-buttons">
        <q-btn
          class="btn left"
          color="primary"
          label="<"
          v-if="plantBedsStore.state.moveSetModusIsActive[props.bedNumber - 1]"
          @click="moveSet('left')"
        >
        </q-btn>

        <q-btn
          class="btn right"
          color="primary"
          label=">"
          v-if="plantBedsStore.state.moveSetModusIsActive[props.bedNumber - 1]"
          @click="moveSet('right')"
        >
        </q-btn>
      </div>
    </div>
  </div>

  <InfoModal
    @closeInfoModal="feedbackOpen = false"
    :open="feedbackOpen"
    :message="state.feedback.message"
  ></InfoModal>
</template>

<script setup>
import { reactive, watch, ref, computed } from 'vue'
import InfoModal from '@/components/InfoModal.vue'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'

const plantBedsStore = usePlantBedsStore()
console.log(plantBedsStore)

const state = reactive({
  activeSet: {},
  startColums: [],
  currentPosition: null, //Index in startColums-Array

  feedback: {
    message: ''
  }
})
const feedbackOpen = ref(false)

const props = defineProps({
  bedNumber: Number
})

const isSetActive = computed(() => {
  return !(
    plantBedsStore.state.activeSets.find((bedItem) => bedItem.bedNumber === props.bedNumber) ===
    undefined
  )
})

function moveSet(direction) {
  //finde actives set
  let activeSetId = null
  activeSetId = plantBedsStore.state.activeSets.find(
    (bedItem) => bedItem.bedNumber === props.bedNumber
  ).setId

  if (activeSetId === null) {
    state.feedback.message =
      'Bitte wähle einen Satz aus, den du verschieben möchtest. Dazu auf den Satz tippen/klicken.'
    feedbackOpen.value = true
    return
  } else {
    const currentBed = plantBedsStore.state.currentBedplan.beds.find(
      (bedItem) => bedItem.bedNumber === props.bedNumber
    )

    const currentSet = currentBed.sets.find((setItem) => setItem.id === activeSetId)
    state.activeSet = currentSet
  }

  state.startColums = plantBedsStore.newStartColumns(
    props.bedNumber,
    plantBedsStore.state.currentMonth,
    plantBedsStore.state.currentPeriod,
    state.activeSet
  )

  if (state.activeSet.startTime < plantBedsStore.currentTime) {
    const startMonth = plantBedsStore.translateTimeBack(state.activeSet.startTime).month
    const startPeriod = plantBedsStore.translateTimeBack(state.activeSet.startTime).period

    state.feedback.message =
      'Ein Satz kann nur im Pflanzzeitraum im Beet verschoben werden. Gehe zu ' +
      startPeriod +
      ' ' +
      startMonth +
      ' um den Satz im Beet zu verschieben oder wähle einen anderen Satz aus.'
    feedbackOpen.value = true
    return
  }

  if (
    state.startColums.length === 0 ||
    (direction === 'left' && state.activeSet.startColum <= 0) ||
    (direction === 'right' && state.activeSet.startColum >= 24 - state.activeSet.neededColums)
  ) {
    console.log('rechts angekommen: ', state.activeSet.startColum)
    state.feedback.message =
      'Es gibt leider keine Möglichkeiten diesen Satz zu verschieben, da andere Sätze zum aktuellen Zeitpunkt oder später dies blockieren.'

    feedbackOpen.value = true
    return
  }

  state.startColums = state.startColums.sort((a, b) => a - b)

  state.currentPosition = state.startColums.indexOf(state.activeSet.startColum)

  //neue Position setzen
  let newStartColum = null
  if (direction === 'left') {
    newStartColum = state.startColums[state.currentPosition - 1]
  } else {
    newStartColum = state.startColums[state.currentPosition + 1]
  }

  // fix für "kollidierende" sets
  if (newStartColum === undefined) {
    state.feedback.message =
      'Es gibt leider keine Möglichkeiten diesen Satz zu verschieben, da andere Sätze zum aktuellen Zeitpunkt oder später dies blockieren.'

    feedbackOpen.value = true
    return
  }

  plantBedsStore.updatePositionInBed(props.bedNumber, state.activeSet.id, newStartColum)
}

watch(feedbackOpen, async () => {
  if (feedbackOpen.value) {
    setTimeout(() => {
      feedbackOpen.value = false
    }, 6000)
  }
})
</script>

<style scoped>
.toolbar-move-switch {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  height: 7rem;
  align-items: flex-start;
  margin-right: 0.5rem;
}
.toolbar-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: start;
}
.toggle-slider {
  justify-self: start !important;
}
.move-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

@media screen and (min-width: 600px) {
  .toolbar-move-switch {
    height: 6rem;
  }
}
@media screen and (min-width: 1000px) {
  .toolbar-move-switch {
    height: 5.5rem;
  }
}
</style>
