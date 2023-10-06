<template>
  <header>
    <PlantBedNavigation></PlantBedNavigation>
    <!--Monats auswahl-->
    <!-- Zeit Auswahl-->
  </header>
  <main>
    <!--Beet 1-->
    <p>{{ plantBedsStore.state.currentMonth }}</p>
    <p>{{ plantBedsStore.state.currentPeriod }}</p>

    <h2>Beet 1</h2>
    <q-btn class="btn-add" color="primary" icon="add" @click.prevent="addPlant()" />
    <div class="bed"></div>
  </main>
  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<script setup>
import PlantBedNavigation from '../components/PlantBedNavigation.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'

import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
const plantBedsStore = usePlantBedsStore()
</script>

<style scoped>
.btn-add {
  margin-left: 3rem;
}
.bed {
  margin: 0 auto;
  width: 200px;
  aspect-ratio: 1.2/2.5;
  background-color: var(--clr-dark);
  border-radius: 10px;
}
</style>
