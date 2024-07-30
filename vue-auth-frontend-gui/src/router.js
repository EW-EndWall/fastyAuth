import { createRouter, createWebHistory } from "vue-router";
import Home from "./pages/Home.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import PasswordSettings from "./pages/PasswordSettings.vue";
import PasswordReset from "./pages/PasswordReset.vue";
import Account from "./pages/Account.vue";
import AccountSettings from "./pages/AccountSettings.vue";
// import AccountStatus from "./pages/AccountStatus.vue";

import store from "./store/index.js";

const routes = [
  { path: "/", component: Home, name: "Home", meta: { requiresAuth: null } },
  {
    path: "/auth/login",
    component: Login,
    name: "Login",
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/register",
    component: Register,
    name: "Register",
    meta: { requiresAuth: false },
  },
  {
    path: "/auth/password-reset",
    component: PasswordReset,
    name: "PasswordReset",
    meta: { requiresAuth: false },
  },
  {
    path: "/account",
    component: Account,
    name: "Account",
    meta: { requiresAuth: true },
  },
  // {
  //   path: "/account/status",
  //   component: AccountStatus,
  //   name: "AccountStatus",
  //   meta: { requiresAuth: true },
  // },
  {
    path: "/account/settings",
    component: AccountSettings,
    name: "AccountSettings",
    meta: { requiresAuth: true },
  },
  {
    path: "/account/password-settings",
    component: PasswordSettings,
    name: "PasswordSettings",
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = (to) =>
    to.matched.some((record) => record.meta)
      ? to.matched[0].meta.requiresAuth
      : null;
  const isAuthenticated = () => store.getters.isAuthenticated;

  if (requiresAuth(to) && !isAuthenticated()) {
    next({ name: "Login" });
  } else if (requiresAuth(to) == false && isAuthenticated()) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
