<script setup>
import SeparatorElement from '@/components/SeparatorElement.vue'
import SiteNavigation from '@/components/SiteNavigation.vue'
</script>

<template>
  <main>
    <h1 class="headline-main headline">Impressum</h1>
    <section class="contributers-section">
      <h2 class="headline-sub">Projektbeteiligte</h2>
      <p>Diese Webapplikation wurde erstellt durch:</p>
      <ul class="contributors-list">
        <li class="contributor">
          <q-icon name="bi-github"></q-icon>
          <a href="https://github.com/wiebken-n">Wiebken</a>
        </li>
        <li class="contributor">
          <q-icon name="bi-github"></q-icon>
          <a href="https://github.com/Colourpieces">Nicole</a>
        </li>
      </ul>
    </section>

    <section class="sources">
      <h2 class="headline-sub">Bildnachweise</h2>
      <ul>
        <li>
          <a href="https://www.svgrepo.com/svg/422954/garden-planting-flower"
            >Garden Planting Flower SVG Vector</a
          >
        </li>
        <li>
          <a href="https://www.freepik.com/">https://www.freepik.com/</a>
        </li>
      </ul>
    </section>
  </main>
  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 2rem;

  height: 100vh; /* gibt es eine bessere Lösung? */
  background-image: url('../src/assets/images/flowers-with-gardening-tools_1000px.svg');
  background-position: left bottom;
  background-size: 35%;
  background-repeat: no-repeat;
}
h1 {
  color: var(--clr-primary);
}
h2 {
  margin-block: 2rem;
}

.contributors-list {
  list-style-type: none;
  line-height: 2rem;
}

.contributor {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 1rem;
}
</style>
