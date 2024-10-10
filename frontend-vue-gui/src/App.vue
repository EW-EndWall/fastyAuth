<script setup>
import componentHeader from "./components/Header.vue";
</script>

<script></script>

<template>
  <div id="app" class="opacity-50">
    <componentHeader />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",

  data() {
    return {
      isDarkMode: false,
    };
  },
  computed: {
    ...mapGetters(["getLanguage"]),
  },
  watch: {
    getLanguage(newLang) {
      // * To reinstall the component after changing the language
      // this.$forceUpdate();
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    },
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
body.dark {
  background: rgb(107, 107, 107);
  background: radial-gradient(
    circle,
    rgba(107, 107, 107, 1) 0%,
    rgba(30, 39, 55, 1) 100%
  );
}
body.light {
  background: rgb(107, 107, 107);
  background: radial-gradient(
    circle,
    rgba(107, 107, 107, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
}
</style>
