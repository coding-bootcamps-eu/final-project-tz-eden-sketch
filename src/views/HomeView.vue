<script setup>
// import SeparatorElement from '@/components/SeparatorElement.vue'
import CardComponent from '@/components/CardComponent.vue'
// import SiteNavigation from '@/components/SiteNavigation.vue'
import { onBeforeMount, reactive } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const state = reactive({
  confirmUserDelete: false,
  changeUserName: false,
  alert: false,
  newName: ''
})

async function deleteUser() {
  await userStore.deleteUser()
  router.push({ name: 'landingpage' })
}

async function changeUser() {
  if (userStore.validateUserName(state.newName)) {
    await userStore.changeName(state.newName)
    state.changeUserName = false
    state.newName = ''
  } else {
    state.alert = true
  }
}

onBeforeMount(async () => {
  await userStore.loadUser()
})
</script>

<template>
  <div class="homeview-content-wrapper">
    <q-bar class="bg-primary text-white">
      <q-space></q-space>
      <q-btn icon="las la-user" color="transparent" text-color="white" flat>
        <q-menu transition-show="scale" transition-hide="scale">
          <q-list style="min-width: 20ch">
            <q-item class="user-greeting">
              <q-item-section>Hallo {{ userStore.state.currentUser.name }}!</q-item-section>
            </q-item>
            <q-separator />

            <q-item class="user-action" clickable @click="state.changeUserName = true">
              <q-item-section>Nutzernamen ändern</q-item-section>
            </q-item>

            <q-item class="user-action" clickable @click="state.confirmUserDelete = true">
              <q-item-section>Nutzer löschen</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <q-dialog v-model="state.confirmUserDelete" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="warning" text-color="white" />
            <span class="q-ml-sm"
              >Willst du deinen Nutzer "{{ userStore.state.currentUser.name }}" wirklich
              löschen?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Löschen" color="warning" v-close-popup @click="deleteUser()" />
            <q-btn flat label="Zurück" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="state.changeUserName" persistent>
        <q-card>
          <q-card-section class="items-center">
            <!-- <q-avatar icon="las la-user" color="primary" text-color="white" /> -->
            <span class="q-ml">Wähle einen neuen Nutzernamen: </span>
            <q-input
              class="input__username"
              outlined
              v-model.trim="state.newName"
              label="neuer Username"
            >
              <template v-slot:append>
                <q-icon name="las la-user" color="accent" />
              </template>
            </q-input>

            <q-dialog v-model="state.alert">
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
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Zurück" color="warning" v-close-popup @click="state.newName = ''" />
            <q-btn flat label="Speichern" color="primary" @click="changeUser()" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-bar>
    <div class="overview">
      <header>
        <h1 class="headline-main headline">EdenSketch</h1>
      </header>

      <main class="card-wrapper">
        <CardComponent
          card-title="Pflanzen"
          card-link="/plantspecies/list"
          card-image="root-vegetable_1000px.svg"
        />
        <CardComponent
          card-title="Beetplanung"
          card-link="/plantbed-selection"
          card-image="raised-bed-vegetables.svg"
        />
        <CardComponent card-title="Aufgaben" card-link="/todos" card-image="gloves.svg" />
        <CardComponent card-title="Wissen" card-link="/blog" card-image="book.svg" />
      </main>
    </div>

    <!-- <SeparatorElement /> -->
    <footer class="shadow-2">
      <a class="impressum" href="/impressum">Impressum</a>
    </footer>
  </div>
</template>

<style scoped>
main {
  padding-bottom: 2rem;
}
.overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 2rem;
  padding-top: 2rem;
  /* padding-bottom: 5rem; */
  flex-grow: 50;
}
.homeview-content-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0;
}
.headline {
  font-size: 5rem;
  border-bottom: 5px solid var(--clr-primary);
  margin-bottom: 5rem;
}

@media screen and (max-width: 380px) {
  /* iPhone SE */
  .headline {
    font-size: 3rem;
  }
}

.card-wrapper {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}
.card-wrapper > * {
  min-width: 70vw;
}
@media screen and (min-width: 600px) {
  .card-wrapper {
    grid-template-columns: 1fr 1fr;
  }
  .card-wrapper > * {
    min-width: 40vw;
  }
}

@media screen and (min-width: 1000px) {
  .card-wrapper {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  .card-wrapper > * {
    min-width: 20vw;
  }
}

.username {
  color: white;
}

.user-greeting {
  background-color: var(--clr-secondary-lighter);
}
.user-greeting * {
  font-size: 1.1em;
}
.user-action:hover {
  background-color: var(--clr-primary-lighter);
}

footer {
  margin-top: 10rem;
  padding: 0.5rem;
  text-align: center;
  height: 5vh;
  background-color: var(--clr-secondary-lighter);
  bottom: 0px;
  width: 100%;
  border-top: 1px solid var(--clr-secondary);
  margin: 0;
}
.impressum {
  color: var(--clr-primary-darker);
  font-weight: 500;
  text-underline-offset: 2px;
}
</style>
