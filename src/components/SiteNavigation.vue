<template>
  <nav>
    <div class="upper-border"></div>
    <q-tabs
      v-model="tab"
      no-caps
      outside-arrows
      mobile-arrows
      class="site-navigation shadow-1"
      indicator-color="primary"
      active-color="primary"
    >
      <q-route-tab name="home" label="Übersicht" icon="bi-house" :to="{ name: 'home' }" />
      <q-route-tab
        name="plants"
        label="Pflanzen"
        icon="svguse:/icons.svg#sprout"
        :to="{ name: 'plantspecieslist' }"
      />
      <q-route-tab name="plan" label="Plan" icon="bi-pencil-square" :to="{ name: 'plantbeds' }" />
      <q-route-tab name="knowledge" label="Wissen" icon="bi-book" :to="{ name: 'blog' }" />
      <q-route-tab
        name="todos"
        label="ToDos"
        icon="svguse:/icons.svg#gloves"
        :to="{ name: 'todos' }"
      />
    </q-tabs>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('')
</script>

<style scoped>
.upper-border {
  height: 5px;
}
nav {
  background-color: var(--clr-secondary-lighter);
  color: var(--clr-primary-darker);
  z-index: 3;
}
</style>
