<script setup>
import SeparatorElement from '@/components/SeparatorElement.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

import { usePlantsStore } from '@/stores/usePlantsStore'
const plantsStore = usePlantsStore()

const variety = computed(() => {
  return plantsStore.getVariety(route.params.plantvariety)
})

const imageUrl = computed(() => {
  return new URL(`/src/assets/images/${variety.value[0].imagename}`, import.meta.url).href
})
</script>

<template>
  <div>
    <q-breadcrumbs color="primary" class="breadcrum">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el label="Übersicht" to="/" icon="bi-house" />

      <q-breadcrumbs-el
        label="Pflanzenarten"
        to="/plantspecies/list/"
        icon="svguse:/icons.svg#sprout"
      />

      <q-breadcrumbs-el
        :label="variety[0].species"
        :to="{
          name: 'plantspeciesview',
          params: { plantspecies: variety[0].plantspeciesId }
        }"
      />

      <q-breadcrumbs-el :label="variety[0].name" />
    </q-breadcrumbs>
    <!-- <SeparatorElement /> -->

    <main>
      <header class="header">
        <div class="image-container">
          <img class="image" :src="imageUrl" :alt="variety[0].name" />
        </div>
        <div class="wrapper-headline">
          <p class="headline-label">Sorte</p>
          <h1 class="headline-main headline-plantname">{{ variety[0].name }}</h1>
          <p class="headline-sub botanical-name">{{ variety[0].botanicname }}</p>
        </div>
      </header>
      <SeparatorElement />

      <article>
        <h2>Art</h2>
        <p>{{ variety[0].species }}</p>
      </article>
      <SeparatorElement />

      <article>
        <h2>Pflanzenfamilie</h2>
        <p>{{ variety[0].plantfamily }}</p>
      </article>
      <SeparatorElement />

      <article>
        <h2>Saisonübersicht</h2>
        <ul>
          <li v-if="variety[0].sowingForPlantingStart">
            Vorziehen: {{ variety[0].sowingForPlantingStart }} bis
            {{ variety[0].sowingForPlantingEnd }}
          </li>
          <li v-if="variety[0].plantingStart">
            Pflanzung: {{ variety[0].plantingStart }} bis {{ variety[0].plantingEnd }}
          </li>
          <li v-if="variety[0].directSowingStart">
            Direktaussat: {{ variety[0].directSowingStart }} bis {{ variety[0].directSowingEnd }}
          </li>
          <li v-if="variety[0].harvestingStart">
            Ernte: {{ variety[0].harvestingStart }} bis {{ variety[0].harvestingEnd }}
          </li>
          <br />
          <br />
          <li v-if="variety[0].cultureDuration">
            Zeit in Beet / Kulturdauer: {{ variety[0].cultureDuration }} Tage
          </li>
        </ul>
      </article>
      <SeparatorElement />

      <article v-if="variety[0].description">
        <h2>Beschreibung</h2>
        <p>{{ variety[0].description }}</p>
      </article>
      <SeparatorElement v-if="variety[0].description" />

      <article>
        <h2>Pflege</h2>
        <ul class="plantcare-details">
          <li class="info-wrapper">
            <!-- <img src="" alt="Planzabstand" class="info-icon" /> -->
            <q-icon name="svguse:/icons.svg#plantdistance" />
            <p class="info-category">Pflanzabstand</p>
            <p class="info-value">{{ variety[0].plantingDistance }} cm</p>
          </li>
          <li class="info-wrapper">
            <img src="" alt="Reihenabstand" class="info-icon" />
            <p class="info-category">Reihenabstand</p>
            <p class="info-value">{{ variety[0].rowDistance }} cm</p>
          </li>
          <li class="info-wrapper">
            <img src="" alt="Saattiefe" class="info-icon" />
            <p class="info-category">Saattiefe</p>
            <p class="info-value">{{ variety[0].sowingDepth }} cm</p>
          </li>
          <li class="info-wrapper">
            <!-- <img src="" alt="Lichtbedarf" class="info-icon" /> -->
            <q-icon name="bi-sun" />
            <p class="info-category">Lichtbedarf</p>
            <p class="info-value">{{ variety[0].light }}</p>
          </li>
          <li class="info-wrapper">
            <img src="" alt="Nährstoffbedarf" class="info-icon" />
            <p class="info-category">Nährstoffbedarf</p>
            <p class="info-value">{{ variety[0].nutrition }}</p>
          </li>
          <li class="info-wrapper">
            <!-- <img src="" alt="Wasserbedarf" class="info-icon" /> -->
            <q-icon name="bi-droplet" />
            <!-- <q-icon name="la-tint" /> geht nicht -->
            <p class="info-category">Wasserbedarf</p>
            <p class="info-value">{{ variety[0].water }}</p>
          </li>
        </ul>
      </article>
      <SeparatorElement />

      <article v-if="variety[0].cultivationTips">
        <h2>Anbautipps</h2>
        <p>{{ variety[0].cultivationTips }}</p>
      </article>
      <SeparatorElement v-if="variety[0].cultivationTips" />

      <article>
        <h2>Meine Sätze im Beet</h2>
        <ul>
          <li>Satz #1 in Beet 2 <span>(seit mitte März)</span></li>
          <li>Satz #2 in Beet 2 <span>(seit Ende März)</span></li>
          <li>Satz #3 in Beet 2 <span>(seit mitte April)</span></li>
        </ul>
      </article>
    </main>

    <nav class="view__nav">
      <SiteNavigation></SiteNavigation>
    </nav>
  </div>
</template>

<style scoped>
main {
  height: 100vh;
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}
h2 {
  font-size: 1rem;
  font-weight: bold;
  color: var(--clr-primary);
  margin: 0;
}

h3 {
  font-size: 1rem;
  color: var(--clr-primary);
  margin: 0;
}

.header {
  margin-top: 2rem;
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
  letter-spacing: 0.25rem;
  color: var(--clr-secondary);
  margin-bottom: 0;
}

.headline-plantname {
  margin: 0;
  margin-bottom: 0.5rem;
}

.botanical-name {
  font-size: 1.5rem;
}

.breadcrum {
  padding-block: 1rem;
}
.plantcare-details {
  list-style: none;
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

article {
  margin-block: auto;
}

.info-wrapper {
  background-color: var(--clr-info);
  display: flex;
  justify-content: start;
  align-items: baseline;
  gap: 0.5rem;
  border-radius: 0.25rem;
  padding: 1rem;
  min-width: 50ch;
}
.info-category {
  margin-bottom: 0;
  color: var(--clr-primary);
  font-weight: bolder;
}
.info-value {
  margin-left: auto;
  margin-bottom: 0;
}
</style>
