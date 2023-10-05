<script setup>
import SiteNavigation from '@/components/SiteNavigation.vue'
</script>
<template>
  <main>
    <q-icon name="fa-leaf"></q-icon>
    <q-breadcrumbs color="primary" class="breadcrum">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el label="Übersicht" to="/" icon="bi-house" />
      <q-breadcrumbs-el label="Pflanzenarten" to="/plantspecies/view/" icon="la-leaf" />
      <!-- todo: verlinkten Path anpassen:Übersicht Pflanzenarten, icon fixen: bei Pflanzenarten soll icon-plants.svg genutzt werden-->
      <q-breadcrumbs-el label="Spinat" />
    </q-breadcrumbs>

    <div class="separator"></div>
    <header class="header">
      <div class="image-container">
        <img class="image" src="../assets/images/bellpepper.webp" alt="paprika" />
      </div>
      <div class="wrapper-headline">
        <p class="headline-label">Art</p>
        <h1 class="headline-main headline-plantname">Spinat</h1>
        <p class="headline-sub botanical-name">Spinacia oleracea</p>
      </div>
    </header>
    <div class="separator"></div>
    <h2>Pflanzenfamilie</h2>
    <p>Gänsefußgewächse (Chenopodiaceae)</p>
    <div class="separator"></div>
    <h2>Beschreibung</h2>
    <p>
      Beschreibung Spinat gehört zur Familie der Gänsefußgewächse. Er hat eine sehr kurze
      Kulturzeit, daher eignet er sich prima als Vor- und Nachkultur. Es gibt ca. 50 Sorten des
      Frühjahrs- und Winterspinats mit diversen Formen, Farben und unterschiedlicher Fleischigkeit.
    </p>
    <div class="separator"></div>
    <h2>Mischkultur</h2>
    <h3>
      <q-icon name="bi-suit-heart-fill"></q-icon>
      Gute Nachbarn
    </h3>
    <ol class="list">
      <li>Radieschen</li>
      <li>Erbse</li>
      <li>Steckrübe</li>
    </ol>

    <h3>
      <q-icon name="bi-lightning-fill" color="warning"></q-icon>
      Schlechte Nachbarn
    </h3>
    <ol class="list">
      <li>Mangold</li>
      <li>Rote Beete</li>
      <li>Liebstöckel</li>
    </ol>
    <div class="separator"></div>
    <h2>Sorten</h2>
    <ol class="list">
      <li>
        <a href="/plantvariety/view/:plantvariety*"> Sorte 1 </a>
      </li>
      <li>Sorte 2</li>
      <li>Sorte 3</li>
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
