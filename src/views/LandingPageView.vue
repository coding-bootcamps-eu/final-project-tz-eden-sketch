<template>
  Hier kommt eine tolle Landing Page hin.
  <br /><br />
  <q-btn label="Login" @click="login"></q-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function login() {
  //check: is known user?
  if (localStorage.getItem('edenSketchUserId') === null) {
    router.push({ name: 'new-user' })
  } else {
    //user is known
    // const userID = localStorage.getItem('edenSketchUserId')
    router.push({ name: 'home' })
  }
}
</script>
