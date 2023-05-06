<script lang="ts" setup>
import { useTheme } from "~/composables/useTheme";

const { themeColors, theme, selectTheme, toggleOpen } = useTheme();

const handleThemeClick = (index) => {
  selectTheme(index)
  toggleOpen()
}
</script>

<template>
  <div class="root justify-center bg-neutral-200">
    <div class="grid grid-cols-3 gap-4 md:gap-8 w-max mx-auto py-12 pb-16 ">
      <button
        v-for="(themeItem, index) in themeColors"
        :key="themeItem.key"
        :class="{active: themeItem.key === theme}"
        :style="`background: ${themeItem.color}`"
        @click="handleThemeClick(index)"
        class="w-14 h-14 md:w-[74px] md:h-[74px] rounded-full relative"></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
button {
  &.active {
    &:before {
      content: '';
      position: absolute;
      width: calc(100% + 10px);
      height: calc(100% + 10px);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid black;
      border-radius: 50%;
    }
  }
}
</style>