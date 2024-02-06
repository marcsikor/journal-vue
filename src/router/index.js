import { createRouter, createWebHistory } from 'vue-router'
import { getUser } from "../firebase-config/config"
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
    {
      path: '/view/:id',
      name: 'view',
      component: () => import('../views/ViewEntry.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit',
      component: () => import('../views/EditEntry.vue')
    },
  ]
})

router.beforeEach(async (to, from) => {
  
  let userStatus

  try{
    userStatus = await getUser();
  } 
  catch{
    userStatus = null;
  }

  // console.log(userStatus == null)
 if(!userStatus && to.name !== 'home' && to.name !== 'signin' && to.name !== 'signup'){
    // alert('Please sign in to access this page');
   return '/'
 }
})

export default router
