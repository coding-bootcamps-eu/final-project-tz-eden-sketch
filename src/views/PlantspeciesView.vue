<script setup>
import { ref } from 'vue'
</script>
<template>
  <!-- <img class="card__image" src="../assets/icons-plants/icon-bellpepper.webp" alt="paprika" /> -->
  <main>
    <!--toDo: schmaler header mit   <zurück Arteninfo  Sorten   /  Breadcrum -->
    <div class="separator"></div>
    <header class="header">
      <div class="image-container">
        <img class="image" src="../assets/images/bellpepper.webp" alt="paprika" />
      </div>
      <div class="wrapper-headline">
        <p class="headline-label">Art</p>
        <h1 class="headline-plantname">Spinat</h1>
        <p class="botanical-name">Spinacia oleracea</p>
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
    <h3 class="good-neighbors">Gute Nachbarn</h3>
    <ol class="list">
      <li>Radieschen</li>
      <li>Erbse</li>
      <li>Steckrübe</li>
    </ol>

    <h3 class="bad-neighbors">Schlechte Nachbarn</h3>
    <ol class="list">
      <li>Mangold</li>
      <li>Rote Beete</li>
      <li>Liebstöckel</li>
    </ol>
    <div class="separator"></div>
    <h2>Sorten</h2>
    <ol class="list">
      <li>Sorte 1</li>
      <li>Sorte 2</li>
      <li>Sorte 3</li>
    </ol>
  </main>
</template>
<style scoped>
main {
  height: 100vh;
  padding-inline: 1.5rem;
  font-family: 'Ubuntu';
  /*
  font-family steht auch in der main.css aber kommt hier nicht an
  liegt an quasar default Einstellungen (-->Roboto)
  Möglichkeit 1: in jeder Komponente Font-Family angeben
  Möglichkeit 2: !important in der main css nutzen... 
  für abweichende schriftarten muss dann auch ein impirtant genutzt werden.
  */
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
  font-family: 'Vollkorn';
  margin-bottom: 0.5rem;
}

.botanical-name {
  font-family: 'Caveat';
  font-size: x-large;
}

.separator {
  height: 1px;
  background-color: var(--clr-secondary);
}

/* .bad-neighbors::before {
  content: U+F59D;
}
.bad-neighbors::before {
} */
.list {
  list-style: disc;
}
</style>
