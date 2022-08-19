import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

/***
 * meta
 * requiresAuth    : ログインしていないとアクセスできないページ
 * notRequiresAuth : ログインしているとアクセスできないページ
 */

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/signin",
  },
  {
    path: '/signup',
    name: 'signup',
    meta: { notRequiresAuth: true },
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignupView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    meta: { notRequiresAuth: true },
    component: () => import(/* webpackChunkName: "signin" */ '../views/SigninView.vue')
  },
  {
    path: '/afterSignin',
    name: 'AfterSignin',
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "afterSignin" */ '../views/AfterSigninView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

/***
 * require login setting
 */
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const isRequiresAuth: boolean    = to.matched.some(recode => recode.meta.requiresAuth);
  const isNotRequiresAuth: boolean = to.matched.some(recode => recode.meta.notRequiresAuth);
  if (!isRequiresAuth && !isNotRequiresAuth) next(); // ログイン状況の指定のないページ
  onAuthStateChanged(getAuth(), (user) => {
    if (user) {
      if (isNotRequiresAuth) next({ path: "/afterSignin", query: { redirect: to.fullPath } });
    } else {
      if (isRequiresAuth) next({ path: "/signin", query: { redirect: to.fullPath } });
    }
    next();
  });
});

export default router;
