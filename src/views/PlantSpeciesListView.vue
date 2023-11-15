<script setup>
import SiteNavigation from '@/components/SiteNavigation.vue'
import CardComponent from '@/components/CardComponent.vue'
import { usePlantsStore } from '@/stores/usePlantsStore'
const plantsStore = usePlantsStore()
</script>

<template>
  <div class="view-content-wrapper-padding">
    <main>
      <h1 class="headline-main headline">Pflanzenarten</h1>

      <div class="card-wrapper">
        <CardComponent
          v-for="species of plantsStore.state.plantSpecies"
          :key="species.id"
          :card-image="species.imagename ? species.imagename : 'default_vegetable.webp'"
          :card-title="species.name"
          :card-link="`/plantspecies/view/${species.id}`"
        />
      </div>
    </main>
  </div>
  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<style scoped>
main {
  padding-inline: 2rem;
  margin-inline: auto;
  text-align: center;
  max-width: 1440px;
}
.headline {
  color: var(--clr-primary);
  text-align: left;
}

.card-wrapper {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  justify-items: center;
}

@media screen and (min-width: 576px) {
  .card-wrapper {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (min-width: 768px) {
  .card-wrapper {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (min-width: 992px) {
  .card-wrapper {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
