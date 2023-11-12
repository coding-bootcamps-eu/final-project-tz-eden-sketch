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
  <RouterView />
</template>

<style scoped></style>
