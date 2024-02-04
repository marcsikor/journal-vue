import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/new',
      name: 'new',
      component: () => import('../views/NewEntry.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/EntryList.vue')
    },
  ]
})

export default router
