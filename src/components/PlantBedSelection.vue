<template>
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
        <div class="text-h6 plantbed-name">{{ bed.name }}</div>
      </q-card-section>
      <q-card-section class="q-pt-none plantbed-description">
        <div class="text-subtitle2">{{ bed.description }}</div>
      </q-card-section>

      <q-card-actions align="around">
        <q-btn no-caps class="bg-warning text-white" @click="confirm = true" flat
          >Lösche das Beet</q-btn
        >
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar
                icon="svguse:/icons.svg#soil-and-shovel"
                color="warning"
                text-color="white"
              />
              <span class="q-ml-sm">Willst du den Beetplan wirklich löschen?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Löschen" color="warning" v-close-popup />
              <q-btn flat label="Zurück" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-btn no-caps class="bg-primary text-white" flat>Gehe zum Beet</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const confirm = ref(false)

const plantBeds = ref([
  {
    name: 'Beet 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet enim urna, ac posuere mauris pellentesque ac. Nam luctus sit amet tellus vitae sagittis. Duis laoreet libero ac augue mollis cursus.'
  },
  {
    name: 'Beet 2',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet enim urna, ac posuere mauris pellentesque ac. '
  },
  {
    name: 'Beet 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
])
</script>

<style scoped>
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
}
</style>
