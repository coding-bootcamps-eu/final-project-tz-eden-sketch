<script setup>
import SiteNavigation from '@/components/SiteNavigation.vue'
</script>

<template>
  <main>
    <h1 class="headline-main headline">Impressum</h1>
    <section class="contributers-section">
      <h2 class="headline-sub">Projekt</h2>

      <p>
        Diese
        <a href="https://github.com/coding-bootcamps-eu/final-project-tz-eden-sketch">
          Webapplikation
        </a>
        wurde erstellt durch:
      </p>
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
        <li>weitere Grafiken erstellt durch Nicole</li>
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
  background-image: url('/flowers-with-gardening-tools_1000px.svg');
  background-position: 10% 85%;
  background-size: 35%;
  background-repeat: no-repeat;
}

@media screen and (max-width: 380px) {
  /* iPhone SE */
  h1 {
    margin: 0;
  }
  h2 {
    margin-bottom: 0.5em;
  }
  main {
    background-size: 35%;
  }
}

@media screen and (max-width: 992px) {
  /* Tablet */
  main {
    background-size: 55%;
  }
}
@media screen and (min-width: 993px) {
  /* Desktop */
  main {
    background-size: 35%;
  }
}

h1 {
  color: var(--clr-primary);
}
h2 {
  font-size: 2em;
}

section + section {
  margin-top: 2em;
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
