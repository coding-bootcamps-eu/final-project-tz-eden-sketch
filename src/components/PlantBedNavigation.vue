<template>
  <div class="navigation-wrapper">
    <q-tabs
      v-model="plantBedsStore.state.currentMonth"
      inline-label
      mobile-arrows
      class="nav-month bg-primary shadow-2"
      dense
      indicator-color="accent"
      active-bg-color="light-green-4"
      active-color="teal-10"
    >
      <q-tab v-for="month in monthArray" :name="month.toLowerCase()" :label="month" :key="month" />
    </q-tabs>

    <q-tabs
      v-model="plantBedsStore.state.currentPeriod"
      inline-label
      class="nav-period bg-secondary shadow-2"
      dense
      indicator-color="accent"
      active-bg-color="light-green-4"
      active-color="teal-10"
    >
      <q-tab v-for="part in timePeriods" :name="part.toLowerCase()" :label="part" :key="part" />
    </q-tabs>
  </div>
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

<style scoped>
.navigation-wrapper {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
}

.nav-month {
  color: var(--clr-info-lighter);
}
.nav-period {
  color: var(--clr-primary-darker);
}
</style>
