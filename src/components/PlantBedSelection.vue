<template>
  <main>
    <div class="plantbed-cards__wrapper">
      <q-card v-for="bed of plantBeds" :key="bed.name" class="plantbed-card my-card">
        <q-card-section horizontal class="bg-secondary text-white">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon class="icon__plantbed" name="svguse:/icons.svg#soil-and-shovel" />
              </q-avatar>
            </q-item-section>
          </q-item>
          <div class="text-h6 plantbed-name">{{ bed.title }}</div>
        </q-card-section>
        <q-card-section class="q-pt-none plantbed-description">
          <div class="text-subtitle2">{{ bed.description }}</div>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn no-caps class="bg-warning text-white button__card" @click="confirm = true" flat
            >Lösche den Plan</q-btn
          >
          <q-btn
            no-caps
            class="bg-primary text-white button__card"
            :to="'/plantbed-edit/' + bed.id"
            flat
            >Gehe zum Plan</q-btn
          >
          <!-- <router-link :to="'/plantbed-edit/'+bed.id">Gehe zum Plan</router-link> -->
          <q-dialog v-model="confirm" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar
                  icon="svguse:/icons.svg#soil-and-shovel"
                  color="warning"
                  text-color="white"
                />
                <span class="q-ml-sm"
                  >Willst du den Beetplan "{{ bed.title }}" wirklich löschen?</span
                >
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Löschen"
                  color="warning"
                  v-close-popup
                  @click="deleteBedplan(bed.id)"
                />
                <q-btn flat label="Zurück" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-card-actions>
      </q-card>

      <q-card class="plantbed-card my-card bg-secondary text-white">
        <q-card-section horizontal>
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <q-icon class="icon__plantbed" name="svguse:/icons.svg#soil-and-shovel" />
              </q-avatar>
            </q-item-section>
          </q-item>
          <div class="text-h6 plantbed-name">Erstelle einen neuen Plan</div>
        </q-card-section>

        <q-card-actions align="around">
          <q-btn
            no-caps
            icon="bi-plus-circle"
            label="Erstelle neuen Plan"
            class="bg-primary text-white button__card"
            flat
            @click="newBedplan = true"
          ></q-btn>
        </q-card-actions>
      </q-card>

      <q-dialog v-model="newBedplan" persistent>
        <q-card class="full-width" style="max-width: 700px">
          <q-bar class="bg-secondary text-white">
            neuer Beetplan
            <q-space></q-space>
            <q-btn v-close-popup icon="close" size="sm" dense flat @click="resetForm"></q-btn>
          </q-bar>
          <q-card-section style="max-height: 60vh" class="scroll">
            <q-form class="colum">
              <q-input
                outlined
                v-model.trim="form.title"
                label="Name des Beetplans"
                :rules="[requiredRule]"
              ></q-input>

              <q-input
                outlined
                v-model="form.description"
                type="textarea"
                label="Beschreibung"
                placeholder="Notizen zu deinem Beetplan"
              ></q-input>
            </q-form>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Abbrechen" color="warning" v-close-popup @click="resetForm" />
            <q-btn
              flat
              label="Speichern und zum neuen Beetplan"
              color="primary"
              v-close-popup
              @click="addNewBedplan"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
import { useRouter } from 'vue-router'

const plantBedsStore = usePlantBedsStore()
const router = useRouter()

const confirm = ref(false)
const newBedplan = ref(false)
const form = ref({
  title: '',
  decription: '',
  userVarieties: []
})

const plantBeds = ref()

const requiredRule = (val) => (val && val.length > 0) || 'Bitte gib einen Namen ein'

async function addNewBedplan() {
  //todo: echte User Id einfügen
  const newBedId = await plantBedsStore.addBedplan(
    '36169072-803a-4f09-83db-8f908f0eb33c',
    form.value.title,
    form.value.description,
    [] //todo: userVarieties abfragen
  )
  console.log('neue Beet id ', newBedId)
  resetForm()
  router.push({ name: 'plantbed-edit', params: { bedId: newBedId } })
}

localStorage.setItem('userId', '36169072-803a-4f09-83db-8f908f0eb33c') //todo

async function loadPlantbeds() {
  const URL = `http://localhost:3000/users/${localStorage.getItem('userId')}?_embed=bedplans`
  const resp = await fetch(URL)
  const data = await resp.json()
  return data.bedplans
}
function resetForm() {
  form.value.title = ''
  form.value.description = ''
  form.value.userVarieties = []
}

async function deleteBedplan(bedplanId) {
  await plantBedsStore.deleteBedplan(bedplanId)
  plantBeds.value = await loadPlantbeds()
}

onBeforeMount(async () => {
  plantBeds.value = await loadPlantbeds()
})
</script>

<style scoped>
.text-h6 {
  font-size: 1.1rem;
}

.plantbed-cards__wrapper {
  width: 90%;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.plantbed-card {
  width: 25rem;
}

.icon__plantbed {
  scale: 2;
}
.plantbed-name {
  margin: auto 0;
}
.plantbed-description {
  margin-top: 1rem;
  min-height: 2rem;
}
.button__card {
  margin-bottom: 1rem;
}
</style>
