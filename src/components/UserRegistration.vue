<template>
  <q-input class="input__username" outlined v-model="text" label="Username" />
</template>

<script setup>
import { ref } from 'vue'
const text = ref('')
</script>

<style scoped>
html {
  text-align: center;
}
.input__username {
  width: 30rem;
  margin: 0 auto;
}
</style>
