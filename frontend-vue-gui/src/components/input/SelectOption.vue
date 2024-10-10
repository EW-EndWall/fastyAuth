<script>
export default {
  name: "SelectOption",
  props: {
    textName: String,
    idName: String,
    placeholder: String,
    required: {
      type: Boolean,
      default: false,
    },
    selectValue: [Array],
    valueData: String,
  },
  methods: {
    updateInput() {
      this.$emit("update:valueData", this.$refs.inputField.value);
    },
  },
};
</script>

<template>
  <div>
    <label :for="idName" class="block text-gray-700 text-sm font-bold mb-2">
      {{ textName }}
    </label>
    <select
      :id="idName"
      :v-model="idName"
      :required="required"
      ref="inputField"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      @change="updateInput"
    >
      <option></option>
      <option
        v-for="(item, index) in selectValue"
        :key="index"
        :value="item[0] !== placeholder ? item[0] : ''"
        :selected="item[0] === placeholder"
      >
        {{ item[1] }}
      </option>
    </select>
  </div>
</template>
