<script setup>
import CardComponent from '@/components/CardComponent.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'
</script>

<template>
  <div class="overview">
    <!-- <q-icon name="fa-brands fa-rebel" /> -->
    <!--q-icon name="svguse:/icons.svg#seedling" /-->
    <!--q-icon name="svguse:/icons.svg#sprout" /-->

    <header>
      <h1 class="headline-main headline">Eden Sketch</h1>
    </header>

    <main class="card-wrapper">
      <CardComponent
        card-title="Pflanzen"
        card-link="/plantspecies/list"
        card-image="../src/assets/images/root-vegetable_1000px.svg"
      />
      <CardComponent
        card-title="Beetplanung"
        card-image="../src/assets/images/raised-bed-vegetables.svg"
      />
      <CardComponent
        card-title="Aufgaben"
        card-link="/todos"
        card-image="../src/assets/images/gloves.svg"
      />
      <CardComponent
        card-title="Wissen"
        card-link="/blog"
        card-image="../src/assets/images/book.svg"
      />
    </main>
    <SeparatorElement />
    <footer>
      <a href="/impressum">Impressum</a>
    </footer>
  </div>

  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<style scoped>
.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 2rem;
  padding-bottom: 5rem;
}

.headline {
  color: var(--clr-primary);
  font-family: 'Caveat';
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
