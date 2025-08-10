import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import BookListPage from '../pages/BookListPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/books', component: BookListPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
