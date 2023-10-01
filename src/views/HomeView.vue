<script setup>
import CardComponent from '@/components/CardComponent.vue'
</script>

<template>
  <div class="overview">
    <!-- <q-icon name="fa-brands fa-rebel" /> -->
    <header>
      <h1>Eden Sketch</h1>
    </header>
    <main class="card-wrapper">
      <CardComponent card-title="Pflanzen" card-link="/plantspecies/list" />
      <CardComponent card-title="Beetplanung" />
      <CardComponent card-title="Aufgaben" card-image="@/src/assets/images/gloves.jpg" />
      <CardComponent
        card-title="Wissen"
        card-link="/blog"
        card-image="@/src/assets/images/books.jpg"
      />
    </main>
  </div>
</template>

<style scoped>
.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
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

@media screen and (min-width: 2000px) {
  .card-wrapper {
    display: grid;
    gap: 1rem;

    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
</style>
