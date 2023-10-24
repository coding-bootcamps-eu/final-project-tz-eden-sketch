<script setup>
import SeparatorElement from '@/components/SeparatorElement.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'
import { onBeforeMount, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { usePlantsStore } from '@/stores/usePlantsStore'

const route = useRoute()
const plantsStore = usePlantsStore()

const imageUrl = computed(() => {
  return new URL(`/src/assets/images/${state.species.imagename}`, import.meta.url).href
})

const state = reactive({
  species: {},
  varieties: []
})

async function getSpecies() {
  const URL = `http://localhost:3000/plantspecies/${route.params.plantspecies}`
  const resp = await fetch(URL)
  const data = await resp.json()
  return data
}

onBeforeMount(async () => {
  state.species = await getSpecies()
  state.varieties = plantsStore.varietiesBySpecies(route.params.plantspecies)
})
</script>
<template>
  <main>
    <q-breadcrumbs color="primary" class="breadcrum">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
        <!--todo: icon selbst downloaden -->
      </template>

      <q-breadcrumbs-el label="Übersicht" :to="{ name: 'home' }" icon="bi-house" />
      <q-breadcrumbs-el
        label="Pflanzenarten"
        to="/plantspecies/list/"
        icon="svguse:/icons.svg#sprout"
      />
      <q-breadcrumbs-el :label="state.species.name" />
    </q-breadcrumbs>

    <SeparatorElement />
    <header class="header">
      <div class="image-container">
        <img class="image" :src="imageUrl" :alt="state.species.name" />
      </div>
      <div class="wrapper-headline">
        <p class="headline-label">Art</p>
        <h1 class="headline-main headline-plantname">{{ state.species.name }}</h1>
        <p class="headline-sub botanical-name">{{ state.species.botanicname }}</p>
      </div>
    </header>
    <SeparatorElement />

    <h2>Pflanzenfamilie</h2>
    <p>{{ state.species.plantfamily }}</p>
    <SeparatorElement />

    <h2>Beschreibung</h2>
    <p>{{ state.species.description }}</p>
    <SeparatorElement />

    <h2>Mischkultur</h2>
    <h3>
      <q-icon name="bi-suit-heart-fill"></q-icon>
      Gute Nachbarn
    </h3>
    <ol class="list">
      <li v-for="neighbor in state.species.goodNeighbors" :key="neighbor">{{ neighbor }}</li>
    </ol>

    <h3>
      <q-icon name="bi-lightning-fill" color="warning"></q-icon>
      Schlechte Nachbarn
    </h3>
    <ol class="list">
      <li v-for="neighbor in state.species.badNeighbors" :key="neighbor">{{ neighbor }}</li>
    </ol>
    <SeparatorElement />

    <h2>Sorten</h2>
    <ol class="list">
      <routerLink
        v-for="variety in state.varieties"
        :key="variety.id"
        :to="{ name: 'plantvarietyview', params: { plantvariety: variety.id } }"
      >
        <li>
          {{ variety.name }}
        </li>
      </routerLink>
    </ol>
  </main>

  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<style scoped>
main {
  height: 100vh;
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}
h2 {
  font-size: large;
  font-weight: bold;
  color: var(--clr-primary);
  margin: 0;
}

h3 {
  font-size: medium;
  color: var(--clr-primary);
  margin: 0;
}

.header {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
  padding-block: 0.5rem;
  padding-right: 0.5rem;
}

.image-container {
  max-width: 200px;
}
.image {
  width: 100%;
  object-fit: contain;
}

.headline-label {
  text-transform: uppercase;
  color: var(--clr-secondary);
  margin-bottom: 0;
}

.headline-plantname {
  margin: 0;
  margin-bottom: 0.5rem;
}

.botanical-name {
  font-size: x-large;
}

.separator {
  /* als eigene Komponente definieren? */
  height: 1px;
  background-color: var(--clr-secondary);
}

.breadcrum {
  padding-block: 1rem;
}
.list {
  list-style: disc;
}
</style>
