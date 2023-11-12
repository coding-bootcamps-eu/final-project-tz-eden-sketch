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
  return new URL(`/src/assets/images/${variety.value.imagename}`, import.meta.url).href
})
</script>

<template>
  <div class="view-content-wrapper-padding">
    <main>
      <div>
        <q-breadcrumbs color="primary" class="breadcrum">
          <template v-slot:separator>
            <q-icon size="1.5em" name="chevron_right" color="primary" />
          </template>

          <q-breadcrumbs-el label="Übersicht" :to="{ name: 'home' }" icon="bi-house" />

          <q-breadcrumbs-el
            label="Pflanzenarten"
            to="/plantspecies/list/"
            icon="svguse:/icons.svg#sprout"
          />

          <q-breadcrumbs-el
            :label="variety.species"
            :to="{
              name: 'plantspeciesview',
              params: { plantspecies: variety.plantspeciesId }
            }"
          />

          <q-breadcrumbs-el :label="variety.name" />
        </q-breadcrumbs>
        <!-- <SeparatorElement /> -->

        <main>
          <header class="header">
            <div class="image-container">
              <img class="image" :src="imageUrl" :alt="variety.name" />
            </div>
            <div class="wrapper-headline">
              <p class="headline-label">Sorte</p>
              <h1 class="headline-main headline-plantname">{{ variety.name }}</h1>
              <p class="headline-sub botanical-name">{{ variety.botanicname }}</p>
            </div>
          </header>
          <SeparatorElement />

          <article>
            <h2>Art</h2>
            <p>{{ variety.species }}</p>
          </article>
          <SeparatorElement />

          <article>
            <h2>Pflanzenfamilie</h2>
            <p>{{ variety.plantfamily }}</p>
          </article>
          <SeparatorElement />

          <article>
            <h2>Saisonübersicht</h2>
            <ul>
              <li v-if="variety.sowingForPlantingStart">
                Vorziehen: {{ variety.sowingForPlantingStart }} bis
                {{ variety.sowingForPlantingEnd }}
              </li>
              <li v-if="variety.plantingStart">
                Pflanzung: {{ variety.plantingStart }} bis {{ variety.plantingEnd }}
              </li>
              <li v-if="variety.directSowingStart">
                Direktaussat: {{ variety.directSowingStart }} bis {{ variety.directSowingEnd }}
              </li>
              <li v-if="variety.harvestingStart">
                Ernte: {{ variety.harvestingStart }} bis {{ variety.harvestingEnd }}
              </li>

              <li v-if="variety.cultureDuration">
                Zeit in Beet / Kulturdauer: {{ variety.cultureDuration }} Tage
              </li>
            </ul>
          </article>
          <SeparatorElement />

          <article v-if="variety.description">
            <h2>Beschreibung</h2>
            <p>{{ variety.description }}</p>
          </article>
          <SeparatorElement v-if="variety.description" />

          <article class="plantcare">
            <h2>Pflege</h2>
            <ul class="plantcare-details">
              <li class="info-wrapper" v-if="variety.plantingDistance">
                <!-- <img src="" alt="Planzabstand" class="info-icon" /> -->
                <q-icon name="svguse:/icons.svg#plantdistance" />
                <p class="info-category">Pflanzabstand</p>
                <p class="info-value">{{ variety.plantingDistance }} cm</p>
              </li>
              <li class="info-wrapper" v-if="variety.rowDistance">
                <q-icon name="svguse:/icons.svg#arrows-sideways" />

                <p class="info-category">Reihenabstand</p>
                <p class="info-value">{{ variety.rowDistance }} cm</p>
              </li>
              <li class="info-wrapper" v-if="variety.sowingDepth">
                <q-icon name="svguse:/icons.svg#arrows-down" />

                <p class="info-category">Saattiefe</p>
                <p class="info-value">{{ variety.sowingDepth }} cm</p>
              </li>
              <li class="info-wrapper" v-if="variety.light">
                <!-- <img src="" alt="Lichtbedarf" class="info-icon" /> -->
                <q-icon name="bi-sun" />
                <p class="info-category">Lichtbedarf</p>
                <p class="info-value">{{ variety.light }}</p>
              </li>
              <li class="info-wrapper" v-if="variety.nutrition">
                <q-icon name="svguse:/icons.svg#utensils" />
                <p class="info-category">Nährstoffbedarf</p>
                <p class="info-value">{{ variety.nutrition }}</p>
              </li>
              <li class="info-wrapper" v-if="variety.water">
                <!-- <img src="" alt="Wasserbedarf" class="info-icon" /> -->
                <q-icon name="bi-droplet" />
                <!-- <q-icon name="la-tint" /> geht nicht -->
                <p class="info-category">Wasserbedarf</p>
                <p class="info-value">{{ variety.water }}</p>
              </li>
            </ul>
          </article>
          <SeparatorElement v-if="variety.cultivationTips" />

          <article class="cultivation-tips" v-if="variety.cultivationTips">
            <h2>Anbautipps</h2>
            <p>{{ variety.cultivationTips }}</p>
          </article>
          <!-- <SeparatorElement v-if="variety.cultivationTips" /> -->

          <!-- <article>
            <h2>Meine Sätze im Beet</h2>
            <ul>
              <li>Satz #1 in Beet 2 <span>(seit mitte März)</span></li>
              <li>Satz #2 in Beet 2 <span>(seit Ende März)</span></li>
              <li>Satz #3 in Beet 2 <span>(seit mitte April)</span></li>
            </ul>
          </article> -->
        </main>
      </div>
    </main>
  </div>
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
  font-size: 2rem;
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
  display: grid;
  grid-template-columns: 9rem 1fr;
  justify-content: start;
  align-items: center;
  gap: 3rem;
  padding-block: 0.5rem;
  padding-right: 0.5rem;
}
.image-container {
  width: 100%;
}
.image {
  width: 100%;
  max-height: 20rem;
  object-fit: contain;
}

.headline-label {
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: var(--clr-secondary);
  margin-bottom: 0;
}

.headline-plantname {
  margin: 0;
  margin-bottom: 0.5rem;
  word-break: break-word;
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
  padding-left: 0;
}

@media screen and (max-width: 600px) {
}

article {
  margin-block: auto;
}
article:last-child {
  padding-bottom: 7rem;
}

.info-wrapper {
  background-color: var(--clr-info);
  display: flex;
  justify-content: start;
  align-items: baseline;
  gap: 0.5rem;
  border-radius: 0.25rem;
  padding: 1rem;
  min-width: 30ch;
  width: 50ch;
  flex-wrap: wrap;
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
