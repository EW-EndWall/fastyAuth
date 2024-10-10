<script setup>
import componentHeaderMenu from "./HeaderMenu.vue";
</script>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      darkMode:
        (localStorage?.getItem("theme") == "dark" ? true : false) || false,
    };
  },
  created() {
    this.changleTheme();
  },
  mounted() {
    if (this.darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  },
  methods: {
    toggleThemeDarkMode() {
      const mode = !this.darkMode;
      // * set theme mode data
      this.darkMode = mode;
      if (mode == true) {
        // * Dark mode
        localStorage.setItem("theme", "dark");
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        // * Light mode
        localStorage.setItem("theme", "light");
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
      this.changleTheme();
    },

    changleTheme() {
      // * On page load or when changing themes
      if (this.darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
};
</script>

<template>
  <div class="flex justify-center sm:mb-20 mb-40">
    <componentHeaderMenu />

    <div class="fixed bottom-2 right-2">
      <button
        @click="toggleThemeDarkMode"
        data-tooltip-target="default-form-example-toggle-dark-mode-tooltip"
        type="button"
        data-toggle-dark="dark"
        class="flex items-center w-9 h-9 justify-center text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-xl toggle-dark-state-example hover:bg-gray-100 hover:text-blue-700 focus:z-10 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <svg
          v-if="darkMode == true"
          data-toggle-icon="moon"
          class="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 20"
        >
          <path
            d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"
          ></path>
        </svg>

        <svg
          v-else
          data-toggle-icon="sun"
          class="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"
          ></path>
        </svg>
        <span class="sr-only">Toggle dark/light mode</span>
      </button>
    </div>
  </div>
</template>
