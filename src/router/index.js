import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/front/FrontStage'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/front/Home')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/front/Login')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('@/components/back/BackStage'),
    children: [
      {
        path: 'products',
        name: 'BackProducts',
        component: () => import('@/views/back/BackProducts'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/backstage',
    component: () => import('@/components/back/BackStage'),
    children: [
      {
        path: 'shopping',
        name: 'Backshopping',
        component: () => import('@/views/back/BackShopping')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
