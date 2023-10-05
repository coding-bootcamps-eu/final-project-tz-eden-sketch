<script setup>
import SiteNavigation from '../components/SiteNavigation.vue'
import CardComponent from '@/components/CardComponent.vue'
import { usePlantsStore } from '@/stores/usePlantsStore'
const plantsStore = usePlantsStore()

console.log('vorher:')
console.log(plantsStore.getAllSpecies())
plantsStore.setSpecies(
  'Orange',
  'bellpepper.webp',
  'schlauer Name',
  'Testfamilie',
  'Lorem Ipsum trfzguhijouzghcf',
  ['Kirschen', 'Tomaten', 'Salat'],
  ['Kirschen', 'Tomaten', 'Salat']
)
plantsStore.setSpecies(
  'Apfel',
  'bellpepper.webp',
  'schlauer Name',
  'Testfamilie',
  'Lorem Ipsum trfzguhijouzghcf',
  ['Kirschen', 'Tomaten', 'Salat'],
  ['Kirschen', 'Tomaten', 'Salat']
)
console.log('nachher:')
console.log(plantsStore.getAllSpecies())
</script>

<template>
  <main>
    <h1 class="headline-main headline">Pflanzenarten</h1>

    <div class="card-wrapper">
      <CardComponent
        v-for="species of plantsStore.getAllSpecies()"
        :key="species.id"
        :card-image="`/src/assets/images/${species.imagename}`"
        :card-title="species.name"
        :card-link="`/plantspecies/view/${species.name}`"
      />
    </div>
  </main>
  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<style scoped>
main {
  padding-inline: 2rem;
}
.headline {
  color: var(--clr-primary);
}

.card-wrapper {
  display: grid;
  gap: 1rem;

  grid-template-columns: 1fr;
}

@media screen and (min-width: 600px) {
  .card-wrapper {
    display: grid;
    gap: 1rem;

    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media screen and (min-width: 1000px) {
  .card-wrapper {
    display: grid;
    gap: 1rem;

    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
