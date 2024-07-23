<script>
export default {
  name: "ElementButton",
  props: {
    textName: String,
  },
};
</script>

<template>
  <div class="flex flex-row justify-around items-center">
    <button
      type="submit"
      class="p-2 font-semibold rounded-md border border-gray-300 bg-neutral-200 hover:bg-neutral-400 text-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
    >
      {{ textName }}
    </button>
  </div>
</template>
