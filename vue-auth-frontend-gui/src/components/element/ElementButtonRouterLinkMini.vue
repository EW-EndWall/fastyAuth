<script>
export default {
  name: "ElementButtonRouterLinkMini",
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
      return `font-semibold text-xs ${this.class}`;
    },
  },
};
</script>

<template>
  <router-link :to="url" :class="classes">
    {{ textName }}
  </router-link>
</template>
