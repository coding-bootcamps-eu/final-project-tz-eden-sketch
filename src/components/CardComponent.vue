<script setup>
// import { ref } from 'vue'

const props = defineProps({
  cardImage: String,
  cardTitle: String,
  cardDescription: String,
  cardLink: String,
  cardElement: Object
  /* wie definiert man hier default werte?? */
})

// const emit = defineEmits(['cardClick'])
</script>

<template>
  <div class="card">
    <div class="content-wrapper">
      <img class="card-image" :src="cardImage" />
      <!-- todo: geht nicht-->

      <div class="card-infos">
        <h2 class="card-title">{{ cardTitle }}</h2>
        <p class="card-description">{{ cardDescription }}</p>
      </div>
    </div>
    <a :href="cardLink" class="card-link"></a>
    <!-- <a :href="cardLink" class="card-link" @click="$emit('cardClick', cardElement)"></a> -->
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
  border: 1px solid red;
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
  border: 1px solid black;
}

.card-infos {
  padding-block: 1rem;
  margin-inline: auto;
}

.card-link {
  /* To stretch the link on top of the card */
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
