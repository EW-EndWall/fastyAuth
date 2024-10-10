<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
};
</script>

<template>
  <div
    class="container w-10/12 mx-auto my-3 p-5 text-gray-700 dark:text-gray-400 bg-gray-300 dark:bg-gray-800 rounded-md"
  >
    <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
      <div class="sm:col-span-3 flex justify-center items-center my-auto">
        <div>
          <img
            src="/src/assets/logo/login-logo-bg.svg"
            alt="logo"
            class="w-full h-full3 m-auto"
          />
        </div>
      </div>
      <div class="sm:col-span-2 my-auto">
        <div>
          <h1 class="text-2xl font-bold text-center">
            {{ t("page.home.title") }}
          </h1>
          <p class="p-2">
            {{ t("page.home.content") }}
          </p>
          <div
            class="flex flex-row gap-3 justify-center mt-4 items-center"
            v-if="!isAuthenticated"
          >
            <span>
              <router-link
                to="/auth/login"
                class="p-2 font-semibold rounded-md border border-gray-300 bg-neutral-200 hover:bg-neutral-400 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                {{ t("page.home.button.login") }}
              </router-link>
            </span>
            <span> ——</span>
            <span>
              <router-link
                to="/auth/register"
                class="p-2 font-semibold rounded-md border border-gray-300 bg-neutral-200 hover:bg-neutral-400 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                {{ t("page.home.button.register") }}
              </router-link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
