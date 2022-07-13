import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import HomeView from '../views/HomeView.vue'

/***
 * meta
 * requiresAuth   : ログインしていないとアクセスできないページ
 */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignupView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import(/* webpackChunkName: "signin" */ '../views/SigninView.vue')
  },
  {
    path: '/afterSignin',
    name: 'AfterSignin',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "afterSignin" */ '../views/AfterSigninView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/***
 * require login setting
 */
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const isRequiresAuth:    boolean = to.matched.some(recode => recode.meta.requiresAuth)
  if (!isRequiresAuth) next()
  onAuthStateChanged(getAuth(), (user) => {
    user ? next() : next({ path: "/signin", query: { redirect: to.fullPath } })
  })
})

export default router
