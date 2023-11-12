<template>
  <q-card class="modal" v-if="props.open" :class="{ active: props.open }">
    <div class="btn-wrapper">
      <q-btn flat icon="close" color="white" class="btn-close" @click="$emit('closeInfoModal')" />
    </div>
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
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0%);

  min-width: 40ch;
  max-width: 50rem;
  min-height: 5rem;
  padding-bottom: 1rem;
  padding-inline: 1rem;

  /* --color:  */
  background-color: var(--clr-warning-bg);

  /*position im nirvana */
  translate: 0 -20rem;
  transition: translate 10s ease-out;
}
.btn-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.btn-close {
  background-color: var(--clr-warning);
  scale: 0.7;
  margin-top: 0.4rem;
}
.active {
  translate: 0 5px;
}
</style>
