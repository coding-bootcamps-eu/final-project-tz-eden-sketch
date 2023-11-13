<template>
  <div class="registration-site-wrapper">
    <div class="registration-content-wrapper">
      <header>
        <h1>
          <span class="headline-sub">Willkommen bei</span
          ><span class="headline-main">EdenSketch</span>
        </h1>
      </header>
      <main>
        <section class="user-registration__wrapper">
          <section class="intro-text">
            <p>Gib hier deinen gewünschten Nutzernamen an und starte durch mit der Beetplanung:</p>
          </section>

          <q-input
            class="input__username"
            outlined
            v-model.trim="username"
            label="Nutzername"
            @keyup.enter="userRegistration"
            :rules="[
              (val) => val.length <= 20 || 'Deine Nutzername ist leider zu lang',
              (val) => val.length > 2 || 'Deine Nutzername ist leider zu kurz'
            ]"
          >
            <template v-slot:append>
              <q-icon name="las la-user" color="accent" />
            </template>
          </q-input>
          <q-btn
            class="button__user-registration"
            color="secondary"
            label="Konto erstellen"
            @click="userRegistration"
          />

          <q-dialog v-model="alert">
            <q-card>
              <q-card-section>
                <div class="text-h6">Username ungültig</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Dein Nutzername muss zwischen 3 und 20 Zeichen lang sein.
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

const router = useRouter()
const userStore = useUserStore()

const username = ref('')
const alert = ref(false)

onBeforeMount(() => {
  checkIfAlreadyLoggedIn()
})

async function userRegistration() {
  if (userStore.validateUserName(username.value)) {
    //username is valid
    await userStore.addNewUser(username.value)
    username.value = ''
    router.push({ name: 'home' })
  } else {
    //username is invalid
    alert.value = true
  }
}

function checkIfAlreadyLoggedIn() {
  //check: is known user?
  if (localStorage.getItem('edenSketchUserId') !== null) {
    router.push({ name: 'home' })
  }
}
</script>

<style scoped>
.registration-site-wrapper {
  min-height: 100vh;
  padding-top: 10vh;
  background-image: url('/backgroung_watercolor-green.svg');
  background-repeat: no-repeat;
  background-size: 3000px 2000px;
  position: relative;
  display: flex;
  justify-content: center;
}

.registration-content-wrapper {
  padding-block: 5rem;
  padding-inline: 2rem;
  max-width: 90vw;
  height: max-content;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.219);
}
@media screen and (min-width: 600px) {
  .registration-content-wrapper {
    width: 500px;
  }
}
@media screen and (min-width: 1000px) {
  .registration-content-wrapper {
    width: 600px;
  }
}

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
  font-size: 1em;
  letter-spacing: -2px;
}

h1 > span:nth-child(2) {
  margin-top: 0.5rem;
  font-size: 2em;
  font-weight: 500;
  letter-spacing: -3px;
}
@media screen and (max-width: 400px) {
  h1 {
    font-size: 2rem;
  }
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
  height: 100%;
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
