// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import EmployeesView from '@/views/EmployeesView.vue'
import EmployeeAddView from '@/views/EmployeeAddView.vue'
import EmployeeEditView from '@/views/EmployeeEditView.vue'
import LoginView from '@/views/ LoginView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: AboutView },
  { path: '/employees', name: 'employees', component: EmployeesView, meta: { requiresAuth: true }},
  { path: '/employees/add',name: 'employees-add', component: EmployeeAddView, meta: { requiresAuth: true }},
  { path: '/employees/:id/edit', name: 'employees-edit', component: EmployeeEditView, meta: { requiresAuth: true }},
  { path: '/login', name: 'login',component: LoginView},

    {
    path: '/',
    redirect: '/employees'
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Global auth guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('accessToken')

  if (to.meta.requiresAuth && !token) {
    return next('/login')
  }

  // Optional: stop logged-in users going back to login
  if (to.path === '/login' && token) {
    return next('/employees')
  }

  next()
})

export default router