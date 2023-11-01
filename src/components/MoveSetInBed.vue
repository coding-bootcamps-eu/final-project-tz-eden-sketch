<template>
  <q-btn
    class="btn"
    color="primary"
    label="< >"
    @click="plantBedsStore.state.moveSetModusIsActive = true"
  >
  </q-btn>

  <q-btn
    class="btn left"
    color="primary"
    label="<"
    v-if="plantBedsStore.state.moveSetModusIsActive"
    @click="moveSet('left')"
  >
  </q-btn>

  <q-btn
    class="btn right"
    color="primary"
    label=">"
    v-if="plantBedsStore.state.moveSetModusIsActive"
    @click="moveSet('right')"
  >
  </q-btn>

  <InfoModal :open="state.feedback.open" :message="state.feedback.message"></InfoModal>
</template>

<script setup>
import { onUpdated, reactive, watch } from 'vue'
import InfoModal from '@/components/InfoModal.vue'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'

const plantBedsStore = usePlantBedsStore()

const state = reactive({
  activeSet: {},
  startColums: [],
  currentPosition: null, //Index in startColums-Array

  feedback: {
    open: false,
    message: ''
  }
})

const props = defineProps({
  bedNumber: Number
})

function moveSet(direction) {
  //finde actives set
  //   const activeSet = plantBedsStore.state.activeSets.find(
  //     (bedItem) => bedItem['bedNumber'] === props.bedNumber
  //   )

  state.activeSet = plantBedsStore.state.activeSet

  console.log(
    'params für startcolum: ',
    props.bedNumber,
    plantBedsStore.state.currentMonth,
    plantBedsStore.state.currentPeriod,
    state.activeSet.varietyId,
    state.activeSet.cultureDurationIntern,
    state.activeSet.rowDistance
  )
  state.startColums = plantBedsStore.calculateStartColumsInBed(
    props.bedNumber,
    plantBedsStore.state.currentMonth,
    plantBedsStore.state.currentPeriod,
    state.activeSet.varietyId,
    state.activeSet.cultureDurationIntern,
    state.activeSet.rowDistance
  )

  if (state.activeSet === undefined) {
    state.feedback.message =
      'Bitte wähle einen Satz aus, den du verschieben möchtest. Dazu auf den Satz tippen/klicken.'
    state.feedback.open = true
  }

  if (state.activeSet.startTime < plantBedsStore.currentTime) {
    const startMonth = plantBedsStore.translateTimeBack(state.activeSet.startTime).month
    const startPeriod = plantBedsStore.translateTimeBack(state.activeSet.startTime).period

    state.feedback.message =
      'Ein Satz kann nur im Pflanzzeitraum im Beet verschoben werden. Gehe zu ' +
      startPeriod +
      ' ' +
      startMonth +
      ' um den Satz im Beet zu verschieben oder wähle einen anderen Satz aus.'
    state.feedback.open = true
  }

  console.log('startcolums: ', state.startColums)
  console.log(state.activeSet.startColum)
  state.currentPosition = state.startColums.indexOf(state.activeSet.startColum)
  console.log(state.currentPosition)
  if (
    state.startColums.length === 0 ||
    (direction === 'left' && state.currentPosition === 0) ||
    (direction === 'rigth' && state.currentPosition === state.startColums.length)
  ) {
    state.feedback.message =
      'Es gibt leider keine Möglichkeiten diesen Satz zu verschieben, da andere Sätze zum aktuellen Zeitpunkt oder später dies blockieren.'

    state.feedback.open = true
  }

  let newStartColum = null
  if (direction === 'left') {
    newStartColum = state.startColums[state.currentPosition - 1]
  } else {
    newStartColum = state.startColums[state.currentPosition + 1]
  }

  plantBedsStore.updatePositionInBed(props.bedNumber, state.activeSet.id, newStartColum)
}

watch(plantBedsStore.state.moveSetModusIsActive, async () => {
  if (plantBedsStore.state.moveSetModusIsActive) {
    setTimeout(() => {
      state.feedback.open = false
    }, 2000)
  }
})

onUpdated(async () => {
  //   state.startColums = plantBedsStore.calculateStartColumsInBed(
  //     props.bedNumber,
  //     plantBedsStore.state.currentMonth,
  //     plantBedsStore.state.currentPeriod,
  //     state.activeSet.varietyId,
  //     state.activeSet.cultureDurationIntern,
  //     state.activeSet.rowDistance
  //   )
})
</script>

<style scoped></style>
