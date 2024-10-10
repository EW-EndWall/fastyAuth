<script>
export default {
  name: "ElementTitle",
  props: {
    textName: {
      type: String,
      default: "Example Title",
    },
    class: {
      type: String,
      default: "",
    },
  },
  computed: {
    classes() {
      return `text-2xl font-bold text-center mb-2 ${this.class}`;
    },
  },
};
</script>

<template>
  <h1 :class="classes">{{ textName }}</h1>
</template>
