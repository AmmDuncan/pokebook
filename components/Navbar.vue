<script lang="ts" setup>
import { watchDebounced } from "@vueuse/core";
import { useTheme } from "~/composables/useTheme";

const props = defineProps({
  search: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(["update:search"]);

const searchValue = ref(props.search);

watchDebounced(searchValue, () => {
  emit("update:search", searchValue.value);
}, { debounce: 500, maxWait: 1500 });

const { toggleOpen } = useTheme();
</script>

<template>
  <div class="navbar relative flex justify-between items-center bg-white px-6">
    <NuxtLink class="logo flex items-center h-20 space-x-2" to="/">
      <img alt="" class="w-24 sm:w-28  md:w-32 -mb-6" src="~/assets/images/logo-illustration.png">
      <Text as-heading class="-mb-2 text-xl sm:text-2xl" variant="h2">Poké
        <Highlight>book</Highlight>
      </Text>
    </NuxtLink>

    <div class="search rounded-full border border-gray-300 space-x-2 flex items-center bg-white/80">
      <div class="icon text-gray-400">
        <IconsMagnifier color="currentColor" />
      </div>
      <input v-model="searchValue" class="text-lg" placeholder="Enter pokemon name" type="search">
    </div>

    <div class="theme-control flex justify-end w-2/12">
      <Highlight>
        <button class="w-[45px] h-[45px] p-1 rounded-full border border-gray-800" @click="toggleOpen">
          <div class="w-full h-full bg-current rounded-full"></div>
        </button>
      </Highlight>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  z-index: 10;
  position: sticky;
  top: 0;
  box-shadow: 0 4px 12px hsla(0, 0%, 0%, 0.06);
}

.search {
  position: absolute;
  top: 120%;
  width: 440px;
  max-width: calc(100% - 64px);
  padding: 11px 16px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 0 hsla(0, 0%, 0%, 0.06);
  backdrop-filter: blur(4px);

  &:focus-within {
    border-color: var(--clr-primary);
  }

  @media (min-width: 1024px) {
    position: relative;
    left: auto;
    transform: translateX(0);
  }

  .icon {
    flex: 0 0 auto;
  }

  input {
    width: 100%;
    flex: 1 1 auto;
    outline: none;
    background: transparent;
  }
}
</style>