import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import TodoView from '../views/Todos/index.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/todos', name: 'Todos', component: TodoView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
