import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlantspeciesView from '../views/PlantspeciesView.vue'
import UserRegistrationView from '@/views/UserRegistrationView.vue'

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
      component: PlantspeciesView
    },
    {
      path: '/new-user',
      name: 'new-user',
      component: UserRegistrationView
    }
  ]
})

export default router
