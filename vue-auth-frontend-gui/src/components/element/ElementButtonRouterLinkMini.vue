<script>
export default {
  name: "ElementButtonRouterLinkMini",
  props: {
    textName: String,
    url: String,
  },
};
</script>

<template>
  <div class="flex flex-row justify-around items-center">
    <router-link :to="url" class="font-semibold text-xs">
      {{ textName }}
    </router-link>
  </div>
</template>
