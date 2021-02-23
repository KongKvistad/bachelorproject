import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import( /* webpackChunkName: "login" */ '../views/Signup.vue')
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: () => import( /* webpackChunkName: "settings" */ '../views/CompanyPage.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/coop/:type?',
    name: 'coop',
    component: () => import( /* webpackChunkName: "settings" */ '../views/Coop.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import( /* webpackChunkName: "settings" */ '../views/Settings.vue'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
