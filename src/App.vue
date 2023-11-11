<script setup>
import { useRouter, RouterView } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()

function checkIfLoggedIn() {
  //check: is known user?
  if (
    localStorage.getItem('edenSketchUserId') === null ||
    localStorage.getItem('edenSketchUserId') === undefined
  ) {
    router.push({ name: 'landingpage' })
  }
}

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
