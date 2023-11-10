<script setup>
import { useRouter, RouterView } from 'vue-router'
import { onMounted, computed, onUpdated } from 'vue'
const router = useRouter()

const currentRouteName = computed(() => {
  return this.$route.name
})

function checkIfLoggedIn() {
  //check: is known user?
  if (
    localStorage.getItem('edenSketchUserId') === null ||
    localStorage.getItem('edenSketchUserId') === undefined
  ) {
    router.push({ name: 'landingpage' })
  }
}
console.log(currentRouteName)

onMounted(() => {
  checkIfLoggedIn()
})
</script>

<template>
  <!-- <header>
    <nav>
      <RouterLink :to="{name: 'home'}">Home</RouterLink>
      <RouterLink to="/plantspecies/view/spinach">Bsp Pflanzenart View: Spinat</RouterLink>
    </nav>
  </header> -->

  <RouterView />
</template>

<style scoped></style>
