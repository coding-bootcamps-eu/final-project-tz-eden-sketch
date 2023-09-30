<script setup>
// import { ref } from 'vue'
import SeparatorElement from '@/components/SeparatorElement.vue'
</script>

<template>
  <div>
    <q-breadcrumbs color="primary" class="breadcrum">
      <!-- todo: Verlinkungen anpassen -->
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el label="Übersicht" to="/" icon="bi-house" />
      <q-breadcrumbs-el
        label="Pflanzenarten"
        to="/plantspecies/view/"
        icon="svguse:/icons.svg#sprout"
      />
      <q-breadcrumbs-el label="Spinat" />
      <q-breadcrumbs-el label="Spinatsorte" />
    </q-breadcrumbs>
    <!-- <SeparatorElement /> -->

    <main>
      <header class="header">
        <div class="image-container">
          <img class="image" src="../assets/images/bellpepper.webp" alt="paprika" />
        </div>
        <div class="wrapper-headline">
          <p class="headline-label">Sorte</p>
          <h1 class="headline-main headline-plantname">Spinatsorte</h1>
          <p class="headline-sub botanical-name">Spinacia oleracea</p>
        </div>
      </header>
      <SeparatorElement />

      <article>
        <h2>Art</h2>
        <p>Spinat</p>
      </article>
      <SeparatorElement />

      <article>
        <h2>Pflanzenfamilie</h2>
        <p>Gänsefußgewächse (Chenopodiaceae)</p>
      </article>
      <SeparatorElement />

      <article>
        <h2>Saisonübersicht</h2>
        <ul>
          <li>Vorziehen: mitte April bis mitte Juni</li>
          <li>Pflanzung: mitte Mai bis mitte Juli</li>
          <li>Direktaussat: mitte Mai bis mitte Juni</li>
          <br />
          <li>Ernte: Ende Juli bis mitte Oktober</li>
          <br />
          <br />
          <li>Zeit in Beet / Kulturdauer: 120 Tage</li>
        </ul>
      </article>
      <SeparatorElement />

      <article>
        <h2>Beschreibung</h2>
        <p>
          Hier wird die einzelne Spinatsorte beschrieben. Beschreibung Spinat gehört zur Familie der
          Gänsefußgewächse. Er hat eine sehr kurze Kulturzeit, daher eignet er sich prima als Vor-
          und Nachkultur. Es gibt ca. 50 Sorten des Frühjahrs- und Winterspinats mit diversen
          Formen, Farben und unterschiedlicher Fleischigkeit.
        </p>
      </article>
      <SeparatorElement />

      <article>
        <h2>Pflege</h2>
        <ul class="plantcare-details">
          <li class="info-wrapper">
            <!-- <img src="" alt="Planzabstand" class="info-icon" /> -->
            <q-icon name="svguse:/icons.svg#plantdistance" />
            <p class="info-category">Pflanzabstand</p>
            <p class="info-value">3 cm</p>
          </li>
          <li class="info-wrapper">
            <img src="" alt="Reihenabstand" class="info-icon" />
            <p class="info-category">Reihenabstand</p>
            <p class="info-value">30 cm</p>
          </li>
          <li class="info-wrapper">
            <img src="" alt="Saattiefe" class="info-icon" />
            <p class="info-category">Saattiefe</p>
            <p class="info-value">0,5 cm</p>
          </li>
          <li class="info-wrapper">
            <!-- <img src="" alt="Lichtbedarf" class="info-icon" /> -->
            <q-icon name="bi-sun" />
            <p class="info-category">Lichtbedarf</p>
            <p class="info-value">Sonne bis Halbschatten</p>
          </li>
          <li class="info-wrapper">
            <img src="" alt="Nährstoffbedarf" class="info-icon" />
            <p class="info-category">Nährstoffbedarf</p>
            <p class="info-value">mittel</p>
          </li>
          <li class="info-wrapper">
            <!-- <img src="" alt="Wasserbedarf" class="info-icon" /> -->
            <q-icon name="bi-droplet" />
            <!-- <q-icon name="la-tint" /> geht nicht -->
            <p class="info-category">Wasserbedarf</p>
            <p class="info-value">mittel</p>
          </li>
        </ul>
      </article>
      <SeparatorElement />

      <article>
        <h2>Anbautipps</h2>
        <p>
          Möhren bevorzugen tiefgründige, lockere Erde mit einem hohen Humusanteil und guter
          Nährstoffversorgung. Die Aussaat von Früh- und Sommermöhren sollte ab Mitte Februar so
          früh wie möglich erfolgen, da die Keimung bei 5°C bis zu 45 Tage dauert. Die Keimlinge
          wachsen sehr langsam und benötigen zu Beginn viel Aufmerksamkeit, damit sie nicht von
          Unkraut überwachsen werden. Es bietet sich an, neben den Möhrenreihen je eine Reihe
          Radieschen als Markiersaat zu säen. Nach der Keimung sollten die Pflänzchen ausgedünnt
          werden.
        </p>
      </article>
      <SeparatorElement />

      <article>
        <h2>Meine Sätze im Beet</h2>
        <ul>
          <li>Satz #1 in Beet 2 <span>(seit mitte März)</span></li>
          <li>Satz #2 in Beet 2 <span>(seit Ende März)</span></li>
          <li>Satz #3 in Beet 2 <span>(seit mitte April)</span></li>
        </ul>
      </article>
    </main>
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
