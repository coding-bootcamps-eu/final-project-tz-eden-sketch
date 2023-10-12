<template>
  <q-tabs
    v-model="plantBedsStore.state.currentMonth"
    inline-label
    mobile-arrows
    class="bg-primary text-accent shadow-2"
  >
    <q-tab v-for="month in monthArray" :name="month.toLowerCase()" :label="month" :key="month" />
  </q-tabs>

  <q-tabs
    v-model="plantBedsStore.state.currentPeriod"
    inline-label
    class="bg-secondary text-white shadow-2"
  >
    <q-tab v-for="part in timePeriods" :name="part.toLowerCase()" :label="part" :key="part" />
  </q-tabs>
</template>

<script setup>
import { ref } from 'vue'

import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
const plantBedsStore = usePlantBedsStore()

/*month selection */
// const tabMonth = ref('')
// const tabPeriod = ref('')

const monthArray = ref([
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember'
])

const timePeriods = ref(['Anfang', 'Mitte', 'Ende'])
/*time selection */
</script>
