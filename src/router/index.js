import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlantSpeciesView from '../views/PlantSpeciesView.vue'
import UserRegistrationView from '@/views/UserRegistrationView.vue'
import PlantSpeciesListView from '@/views/PlantSpeciesListView.vue'
import BlogView from '@/views/BlogView.vue'
import TodoView from '@/views/TodoView.vue'
import PlantvarietyView from '../views/PlantVarietyView.vue'
import PlantBedSelectionView from '../views/PlantBedSelectionView.vue'
import ImpressumView from '../views/ImpressumView.vue'
import PlantBedPlanEditView from '@/views/PlantBedPlanEditView.vue'

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
      path: '/plantspecies/list',
      /*  später * entfernen sobald richtige Daten von Api kommen. Mit * ist Parameter optional */
      name: 'plantspecieslist',
      component: PlantSpeciesListView
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView
    },
    {
      path: '/todos',
      name: 'todos',
      component: TodoView
    },
    {
      path: '/plantvariety/view/:plantvariety*',
      /*  später * entfernen sobald richtige Daten von Api kommen. Mit * ist Parameter optional */
      name: 'plantvarietyview',
      component: PlantvarietyView
    },
    {
      path: '/plantbed-selection',
      name: 'plantbeds',
      component: PlantBedSelectionView
    },
    {
      path: '/impressum',
      name: 'impressum',
      component: ImpressumView
    },
    {
      path: '/plantbed-edit',
      name: 'plantbed-edit',
      component: PlantBedPlanEditView
    }
  ]
})

export default router
