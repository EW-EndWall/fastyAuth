<script>
export default {
  name: "ElementButtonRouterLink",
  props: {
    textName: String,
    url: String,
  },
};
</script>

<template>
  <div class="flex flex-row justify-around items-center">
    <router-link
      :to="url"
      class="p-2 font-semibold rounded-md border border-gray-300 bg-neutral-200 hover:bg-neutral-400 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      {{ textName }}
    </router-link>
  </div>
</template>
