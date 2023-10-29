<template>
  <q-card class="modal" v-if="props.open" :class="{ active: props.open }">
    {{ props.message }}
  </q-card>
  <!-- :style="`--color: ${if (props.type === 'warning') {'--clr-warning-bg'} else {'--clr-primary-bg'} };`" -->
</template>

<script setup>
const props = defineProps({
  open: Boolean,
  message: String
  //   type: String
})
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);

  min-width: 40ch;
  max-width: 50rem;
  min-height: 5rem;
  padding: 1rem;

  /* --color:  */
  background-color: var(--clr-warning-bg);

  /*position im nirvana */
  translate: 0 -20rem;
  transition: translate 10s ease-out;
}

.active {
  translate: 0 5px;
}
</style>
