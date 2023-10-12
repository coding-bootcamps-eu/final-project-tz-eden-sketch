<script setup>
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'
import { usePlantsStore } from '@/stores/usePlantsStore'
const plantsStore = usePlantsStore()

await onBeforeMount(async () => {
  await plantsStore.loadPlantSpecies()
  await plantsStore.loadPlantVarieties()
})

console.log('Appview: ', plantsStore.plantVarieties)
</script>

<template>
  <!-- <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/plantspecies/view/spinach">Bsp Pflanzenart View: Spinat</RouterLink>
    </nav>
  </header> -->

  <RouterView />
</template>

<style scoped></style>
