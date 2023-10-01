<template>
  <nav>
    <q-tabs
      v-model="tab"
      no-caps
      outside-arrows
      mobile-arrows
      class="site-navigation bg-info text-primary shadow-2"
      indicator-color="primary"
    >
      <q-route-tab name="home" label="Übersicht" icon="bi-house" to="/" />
      <q-route-tab name="plants" label="Pflanzen" icon="fas fa-leaf" to="/plantspecies/view" />
      <q-route-tab name="plan" label="Plan" icon="bi-pencil-square" to="/" />
      <q-route-tab name="knowledge" label="Wissen" icon="bi-book" to="/" />
    </q-tabs>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('home')
</script>

<style scoped>
.site-navigation {
  border-top: 1px solid var(--clr-secondary);
}
</style>
