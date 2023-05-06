<script lang="ts" setup>

import { watchDebounced } from "@vueuse/core";

const props = defineProps({
  inputProps: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(["update:modelValue", "search"]);

const search = ref(props.modelValue);

watchDebounced(search, () => {
  emit("update:modelValue", search.value);
}, { debounce: 500, maxWait: 1500 });

const handleSearch = () => {
  emit("update:modelValue", search.value);
  emit("search");
};

</script>

<template>
  <Highlight>
    <div class="search rounded-full p-[9px] bg-current shadow-inner">
      <div class="search__inner rounded-full p-2 bg-white shadow-md">
        <input
          v-model="search"
          class="rounded-full ml-1 p-2 text-xl md:text-2xl text-gray-500"
          type="search"
          v-bind="inputProps"
          @keydown.enter="handleSearch">
        <button
          class="rounded-full p-[14px] transition-transform bg-current"
          @click="handleSearch">
          <IconsMagnifier />
        </button>
      </div>
    </div>
  </Highlight>
</template>

<style lang="scss" scoped>
.search {

  &__inner {
    display: flex;
  }

  input {
    width: 100%;
    flex: 1 1 auto;
    outline: none;
    background: transparent;
  }

  button {
    flex: 0 0 auto;
    box-shadow: 0 0 20px -10px currentColor;
  }
}
</style>