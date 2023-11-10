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
  gap: 2rem;
  position: relative;
  height: 100vh; /* gibt es eine bessere Lösung? */
  background-image: var(--imagePath);
  background-position: left bottom;
  background-size: 50%;
  background-repeat: no-repeat;
}
h1 {
  color: var(--clr-primary);
  margin: 0;
  margin-top: 2rem;
}
.image {
  position: absolute;
  max-width: 500px;
  bottom: 0;
  left: 0;
  transform-origin: bottom left;
}
</style>
