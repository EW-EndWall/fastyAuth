<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HeaderMenu",
  data() {
    return {
      isOpenDropdown: false,
    };
  },
  computed: {
    ...mapGetters(["getUser", "isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),

    toggleDropdown() {
      this.isOpenDropdown = !this.isOpenDropdown;
    },
  },
};
</script>

<template>
  <div
    class="navbar bg-base-300 rounded-box flex items-center flex-col sm:flex-row py-2 px-5 gap-3 text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-800 rounded-md m-2 fixed top-0 w-11/12"
  >
    <div
      class="flex flex-1 items-center px-2 justify-center sm:justify-start py-2 sm:py-0"
    >
      <a class="text-lg font-bold">Project Auth</a>
    </div>

    <div class="flex flex-row items-center justify-center gap-3">
      <router-link
        to="/"
        class="hover:text-gray-100 hover:dark:text-gray-100 hover:bg-slate-400 hover:dark:bg-slate-700 rounded-md px-4 py-2 text-sm font-medium delay-100 duration-100"
        activeClass="text-gray-100 dark:text-gray-100"
      >
        Home
      </router-link>

      <div class="flex flex-row gap-3 items-center" v-if="!isAuthenticated">
        <router-link
          to="/auth/login"
          class="hover:text-gray-100 hover:dark:text-gray-100 hover:bg-slate-400 hover:dark:bg-slate-700 rounded-md px-4 py-2 text-sm font-medium delay-100 duration-100 active:text-gray-100 active:dark:text-gray-100"
          activeClass="text-gray-100 dark:text-gray-100"
        >
          Login
        </router-link>
        <router-link
          to="/auth/register"
          class="hover:text-gray-100 hover:dark:text-gray-100 hover:bg-slate-400 hover:dark:bg-slate-700 rounded-md px-4 py-2 text-sm font-medium delay-100 duration-100"
          activeClass="text-gray-100 dark:text-gray-100"
        >
          Register
        </router-link>
      </div>

      <!--  -->

      <div class="relative inline-block text-left" v-else>
        <div>
          <button
            @click="toggleDropdown"
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {{ getUser }}
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="isOpenDropdown"
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800 dark:ring-gray-600"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <router-link
              to="/account"
              class="text-gray-700 block px-4 py-2 text-sm dark:text-gray-300"
              role="menuitem"
              tabindex="-1"
              id="menu-item-1"
            >
              Account
            </router-link>
            <router-link
              to="/account/settings"
              class="text-gray-700 block px-4 py-2 text-sm dark:text-gray-300"
              role="menuitem"
              tabindex="-1"
              id="menu-item-2"
            >
              Account settings
            </router-link>
            <router-link
              to="/account/password-settings"
              class="text-gray-700 block w-full text-left px-4 py-2 text-sm dark:text-gray-300"
              role="menuitem"
              tabindex="-1"
              id="menu-item-3"
            >
              Password settings
            </router-link>
            <button
              @click="this.logout"
              class="text-gray-700 block w-full text-left px-4 py-2 text-sm dark:text-gray-300"
              role="menuitem"
              tabindex="-1"
              id="menu-item-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <!--  -->
    </div>
  </div>
</template>
