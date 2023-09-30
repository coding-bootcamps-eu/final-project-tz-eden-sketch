<script setup></script>

<template>
  <div class="card">
    <div class="content-wrapper">
      <img class="card-image" src="src/assets/images/bellpepper.webp" />

      <div class="card-infos">
        <h2 class="card-title">Titel hier</h2>
        <p class="card-description">Kurze Beschreibung</p>
      </div>
    </div>
    <a href="/plantspecies/view/:plantspecies*" class="card-link"></a>
  </div>
</template>

<style scoped>
.card {
  overflow: hidden;
  background: var(--clr-info);
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  position: relative;

  max-width: 50ch;
}

.card-image {
  width: 100%;
  object-fit: contain;
}

.card-title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
}

.card-description {
  margin: 0;
}

.content-wrapper {
  display: grid;
  grid-template-rows: auto min-content;
  padding: 1rem;
  position: relative;
}

.card-infos {
  padding-block: 1rem;
  margin-inline: auto;
}

.card-link {
  /* To stretch the link on top of the card div */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
