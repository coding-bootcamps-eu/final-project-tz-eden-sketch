<template>
  <header>
    <h1><span>Willkommen bei</span><span>EdenSketch</span></h1>
  </header>
  <main>
    <section class="user-registration__wrapper">
      <section class="intro-text">
        <p>Gib hier deinen gewünschten Usernamen an und starte durch mit der Beetplanung:</p>
      </section>
      <q-input class="input__username" outlined v-model.trim="username" label="Username">
        <template v-slot:append>
          <q-icon name="las la-user" color="accent" />
        </template>
      </q-input>
      <q-btn
        class="button__user-registration"
        color="secondary"
        label="Bestätige Namen"
        @click="userRegistration"
      />
      <q-dialog v-model="alert">
        <q-card>
          <q-card-section>
            <div class="text-h6">Username zu kurz</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Dein Username muss mindestens 2 Zeichen lang sein.
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const username = ref('')
const alert = ref(false)

function userRegistration() {
  if (username.value.length >= 2) {
    console.log('ToDo: send username to api')
    // call api function from pinia store
    // example router push (add overview site path when available)
    router.push({ path: '/' })
  }
  if (username.value.length < 2) {
    alert.value = true
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

h1 {
  line-height: 1;
  font-size: 2.5rem;
  display: flex;
  flex-direction: column;
}

h1 > span:nth-child(1) {
  font-size: 2.5rem;
  font-family: 'Vollkorn';
  letter-spacing: -2px;
}

h1 > span:nth-child(2) {
  margin-top: 0.5rem;
  font-size: 5rem;
  font-weight: 500;
  font-family: 'Caveat';
  letter-spacing: -3px;
}
main {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.intro-text {
  width: 20rem;
  font-size: 1.1rem;
  text-align: center;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.intro-text > p {
  padding: 0;
  margin: 0;
}

.user-registration__wrapper {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input__username {
  width: 20rem;
}
.button__user-registration {
  margin-top: 0.75rem;
  width: 20rem;
  height: 2.5rem;
}
</style>
