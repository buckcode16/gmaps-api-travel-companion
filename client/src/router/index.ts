import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/default/Default.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/Home.vue')
        },
        {
          path: 'maps',
          name: 'maps',
          component: () => import('@/views/Maps.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/Login.vue')
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/Register.vue')
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/Profile.vue')
        },
        {
          path: 'saved',
          name: 'saved',
          component: () => import('@/views/Saved.vue')
        }
      ]
    }
  ]
})

export default router
