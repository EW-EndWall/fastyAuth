<script>
export default {
  name: "ElementTitle",
  props: {
    textName: String,
  },
};
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-center mb-2">{{ textName }}</h1>
  </div>
</template>
