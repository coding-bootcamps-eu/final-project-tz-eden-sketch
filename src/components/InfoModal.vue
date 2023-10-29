<template>
  <div class="modal" v-if="props.open">{{ props.message }}</div>
</template>

<script setup>
const props = defineProps({
  open: Boolean,
  message: String,
  type: String
})
</script>

<style scoped>
.modal {
  min-width: 40ch;
  min-height: 5rem;
  padding: 1rem;

  background-color: var(--clr-warning-bg);
  color: white;
}
</style>
