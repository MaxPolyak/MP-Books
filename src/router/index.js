import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CartPage from '@/pages/CartPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/books', component: () => import('@/pages/BookListPage.vue') } // TODO lazy load чекнуть ulbiTv
]

const router = createRouter({
  history: createWebHistory(),
  routes
}) 

export default router
