<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  cardImage: String,
  cardTitle: String,
  cardDescription: String,
  cardLink: String,
  cardElement: Object
  /* wie definiert man hier default werte?? */
})

const imageUrl = computed(() => {
  return new URL(`/src/assets/images/${props.cardImage}`, import.meta.url).href
})

// const emit = defineEmits(['cardClick'])
</script>

<template>
  <div class="card">
    <div class="content-wrapper">
      <div class="image-wrapper">
        <img :alt="cardTitle" class="card-image" :src="imageUrl" />
      </div>

      <div class="card-infos">
        <h2 class="card-title">{{ cardTitle }}</h2>
        <p class="card-description">{{ cardDescription }}</p>
      </div>
    </div>
    <router-link :aria-label="cardTitle" :to="cardLink ?? '/'" class="card-link"></router-link>
    <!--?? gibt wert nach Fragezeichen zurück wenn Wert davor nullish-->
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  overflow: hidden;
  background: var(--clr-info);
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.2);
  position: relative;
  max-width: 50ch;
  transition: all 200ms ease;
  border-radius: 8px;
  padding: 0.5rem;
}
.card:hover {
  background-color: var(--clr-info-lighter);
  box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.3);
}
.image-wrapper {
  aspect-ratio: 1;
  width: 100%;
}
.card-image {
  width: 100%;
  height: 100%;
  min-width: 100%;
  object-fit: contain;
}
.card-infos {
  font-family: 'Ubuntu';
}
.card-title {
  font-size: 1.25rem;
  font-weight: 500;
  margin: 0;
}

.card-description {
  margin: 0;
}

.content-wrapper {
  text-align: center;
  padding: 1rem;
  position: relative;
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
