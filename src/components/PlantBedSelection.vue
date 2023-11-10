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
            label="Erstelle einen neuen Plan"
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
              <q-toggle
                checked-icon="check"
                unchecked-icon="clear"
                v-model="toggleChooseUserVarieties"
                color="primary"
                label="Wähle die im Beetplan verfügbaren Sorten aus"
                right-label
              >
              </q-toggle>
            </q-form>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Abbrechen" color="warning" v-close-popup @click="resetForm" />
            <q-btn
              flat
              label="Speichern und zum neuen Beetplan"
              color="primary"
              v-close-popup
              @click="checkVarietyOption()"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <Suspense>
        <q-dialog maximized class="popup-plant add-plants__card" v-model="state.selectVarieties">
          <q-card>
            <q-toolbar class="bg-primary text-white">
              <div class="text-h6">Wähle deine Sorten für diesen Beetplan aus:</div>
              <q-space></q-space>
              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Sorten auswählen"
                  color="primary bg-secondary"
                  v-close-popup
                  @click="addVarietyToUserList()"
                />
                <q-btn flat icon="close" color="white" class="bg-secondary" v-close-popup />
              </q-card-actions>
            </q-toolbar>

            <q-card-section class="user-species-list">
              <q-table
                :rows="state.rows"
                :columns="state.columns"
                row-key="name"
                selection="multiple"
                v-model:selected="state.selected"
                :filter="state.filter"
                rows-per-page-label="Sorten pro Seite"
                :rows-per-page-options="[0, 5, 10, 25, 50]"
                class="table-varieties"
                :grid="$q.screen.lt.md"
              >
                <template v-slot:top-right>
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="state.filter"
                    placeholder="Suche"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>

                <template v-slot:item="props">
                  <div
                    class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition"
                    :style="props.selected ? 'transform: scale(0.95);' : ''"
                  >
                    <q-card
                      bordered
                      flat
                      :class="props.selected ? ($q.dark.isActive ? 'bg-grey-9' : 'bg-grey-2') : ''"
                    >
                      <q-card-section>
                        <q-checkbox dense v-model="props.selected" :label="props.row.name" />
                      </q-card-section>
                      <q-separator />
                      <q-list dense>
                        <q-item
                          v-for="col in props.cols.filter((col) => col.name !== 'desc')"
                          :key="col.name"
                        >
                          <q-item-section>
                            <q-item-label>{{ col.label }}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-item-label caption>{{ col.value }}</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-card>
                  </div>
                </template>
              </q-table>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Zurück" color="warning" v-close-popup />
              <q-btn
                flat
                label="Sorten auswählen"
                color="primary"
                v-close-popup
                @click="addVarietyToUserList()"
              />
            </q-card-actions>
          </q-card> </q-dialog
      ></Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref, onBeforeMount, onUpdated, reactive } from 'vue'
import { usePlantBedsStore } from '@/stores/usePlantBedsStore'
import { useUserStore } from '@/stores/useUserStore'
import { usePlantsStore } from '@/stores/usePlantsStore'
import { useRouter } from 'vue-router'

const plantBedsStore = usePlantBedsStore()
const userStore = useUserStore()
const plantsStore = usePlantsStore()
const router = useRouter()

const confirm = ref(false)
const newBedplan = ref(false)
const form = ref({
  title: '',
  decription: '',
  userVarieties: []
})

const state = reactive({
  selectVarieties: false,
  openAddPlant: false,
  filter: '',
  selected: [],
  columns: [
    { name: 'plantspecies', align: 'center', label: 'Art', field: 'plantspecies', sortable: true },
    { name: 'plantfamily', label: 'Pflanzenfamilie', field: 'plantfamily', sortable: true },
    { name: 'plantvariety', label: 'Sorte', field: 'plantvariety' },
    { name: 'nutrition', label: 'Nährstoffbedarf', field: 'nutrition' },
    { name: 'rowDistance', label: 'Reihenabstand (in cm)', field: 'rowDistance' },
    { name: 'cultureDuration', label: 'Kulturdauer (in Tagen)', field: 'cultureDuration' }
  ],
  userVarieties: [],
  rows: [],

  feedback: {
    open: false,
    variety: '',
    message: ''
  }
})

const toggleChooseUserVarieties = ref(false)
const plantBeds = ref()
const requiredRule = (val) => (val && val.length > 0) || 'Bitte gib einen Namen ein'

function chooseAllVarieties() {
  const userVarieties = []
  for (let i = 0; i < plantsStore.state.plantVarieties.length; i++) {
    userVarieties.push(plantsStore.state.plantVarieties[i].id)
  }
  return userVarieties //array mit IDs von alles ausgewählten Sorten
}

async function checkVarietyOption() {
  if (toggleChooseUserVarieties.value === true) {
    state.selectVarieties = true
  } else {
    state.userVarieties = chooseAllVarieties()
    addNewBedplan()
  }
}
async function addNewBedplan() {
  const newBedId = await plantBedsStore.addBedplan(
    userStore.state.currentUser.id,
    form.value.title,
    form.value.description,
    state.userVarieties
  )
  resetForm()
  router.push({ name: 'plantbed-edit', params: { bedId: newBedId } })
}

async function loadPlantbeds() {
  const userId = localStorage.getItem('edenSketchUserId')
  const URL = `${import.meta.env.VITE_EDENSKETCH_API_URL}/users/${userId}?_embed=bedplans` //todo: besser aus userStore holen??
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

function mapTableContent() {
  const rows = []
  for (let i = 0; i < plantsStore.state.plantVarieties.length; i++) {
    const currentVariety = plantsStore.state.plantVarieties[i]
    const row = {}
    row.name = currentVariety.name
    row.plantfamily = currentVariety.plantfamily
    row.plantspecies = currentVariety.species
    row.plantvariety = currentVariety.name
    row.nutrition = currentVariety.nutrition
    row.plantspeciesId = currentVariety.plantspeciesId
    row.varietyId = currentVariety.id
    row.cultureDurationIntern = currentVariety.cultureDurationIntern
    row.cultureDuration = currentVariety.cultureDuration
    row.rowDistance = currentVariety.rowDistance
    rows.push(row)
  }

  return rows
}

onBeforeMount(async () => {
  plantBeds.value = await loadPlantbeds()
})

onUpdated(() => {
  state.rows = mapTableContent()
})

function addVarietyToUserList() {
  state.userVarieties = []
  for (let i = 0; i < plantsStore.state.plantVarieties.length; i++) {
    for (let j = 0; j < state.selected.length; j++) {
      if (plantsStore.state.plantVarieties[i].id === state.selected[j].varietyId) {
        state.userVarieties.push(plantsStore.state.plantVarieties[i].id)
      }
    }
  }
  addNewBedplan()
  resetForm()
}
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
