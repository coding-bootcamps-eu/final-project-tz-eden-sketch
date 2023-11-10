<template>
  <main :style="`--imagePath: url(${props.image});`">
    <h1 class="headline-main">{{ props.title }}</h1>
    <h2 class="headline-sub">Hier ist noch Baustelle...</h2>
  </main>
  <nav class="view__nav">
    <SiteNavigation></SiteNavigation>
  </nav>
</template>

<script setup>
import SiteNavigation from '@/components/SiteNavigation.vue'

const props = defineProps({
  title: String,
  image: String
})
</script>

<style scoped>
main {
  --imagePath: url('/');
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-inline: 2rem;

  height: 85vh; /* gibt es eine bessere Lösung? */
  background-image: var(--imagePath);
  background-position: 10% 85%;
  background-size: 45%;
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
</style>
