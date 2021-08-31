import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'

// import Crear from '../components/Crear.vue'
// import Editar from '../components/Editar.vue'
import Crud from '../components/Crud.vue'

const routes = [
  {
    path: '/',
    name: 'Crud',
    component: Crud
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
