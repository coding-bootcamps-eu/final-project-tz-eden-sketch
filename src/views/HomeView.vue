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
      <CardComponent />
      <CardComponent />
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

  grid-template-columns: 1;
}

@media screen and (min-width: 600px) {
  /* todo: funktioniert nicht */
  .card-wrapper {
    display: grid;
    gap: 1rem;

    grid-template-columns: 2;
  }
}

@media screen and (min-width: 2000px) {
  /* todo: funktioniert nicht */
  .card-wrapper {
    display: grid;
    gap: 1rem;

    grid-template-columns: 4;
  }
}
</style>
