<script>
export default {
  name: "ElementButtonRouterLink",
  props: {
    textName: {
      type: String,
      default: "Click Me!",
    },
    url: {
      type: String,
      default: "/",
    },
    class: {
      type: String,
      default: "",
    },
  },
  computed: {
    classes() {
      return `p-2 font-semibold rounded-md border border-gray-300 bg-neutral-200 hover:bg-neutral-400 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 text-center ${this.class}`;
    },
  },
};
</script>

<template>
  <router-link :to="url" :class="classes">
    {{ textName }}
  </router-link>
</template>
