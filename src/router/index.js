import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlantSpeciesView from '../views/PlantSpeciesView.vue'
import UserRegistrationView from '@/views/UserRegistrationView.vue'
import PlantvarietyView from '../views/PlantVarietyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/plantspecies/view/:plantspecies*',
      /*  später * entfernen sobald richtige Daten von Api kommen. Mit * ist Parameter optional */
      name: 'plantspeciesview',
      component: PlantSpeciesView
    },
    {
      path: '/new-user',
      name: 'new-user',
      component: UserRegistrationView
    },
    {
      path: '/plantvariety/view/:plantvariety*',
      /*  später * entfernen sobald richtige Daten von Api kommen. Mit * ist Parameter optional */
      name: 'plantvarietyview',
      component: PlantvarietyView
    }
  ]
})

export default router
