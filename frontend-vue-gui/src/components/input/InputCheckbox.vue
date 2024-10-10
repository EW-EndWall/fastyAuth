<script>
export default {
  name: "InputCheckbox",
  props: {
    textName: String,
    idName: String,
    placeholder: Boolean,
    required: {
      type: Boolean,
      default: false,
    },
    valueData: Boolean,
  },
  methods: {
    updateInput() {
      this.$emit("update:valueData", this.$refs.inputField.checked);
    },
  },
};
</script>

<template>
  <div>
    <div class="flex items-center mb-4">
      <input
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600"
        :id="idName"
        type="checkbox"
        :v-model="idName"
        :required="required"
        :checked="placeholder"
        ref="inputField"
        @change="updateInput"
      />
      <label
        for="default-checkbox"
        class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        :for="idName"
        >{{ textName }}</label
      >
    </div>
  </div>
</template>
