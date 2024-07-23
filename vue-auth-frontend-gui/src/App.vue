<script setup>
import componentHeader from "./components/Header.vue";
</script>

<template>
  <div id="app">
    <componentHeader />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
