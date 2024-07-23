<script>
export default {
  name: "InputPassword",
  props: {
    textName: String,
    idName: String,
  },
};
</script>

<template>
  <div>
    <label class="block text-gray-700 text-sm font-bold mb-2" :for="idName">
      {{ textName }}
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :id="idName"
      type="password"
      :v-model="idName"
      required
      placeholder="**********"
    />
  </div>
</template>
