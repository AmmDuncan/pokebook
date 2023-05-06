<template>
  <div v-if="isTabActive(tabs[index]?.value ?? tabs[index])">
    <slot />
  </div>
</template>

<script setup>
const tabs = inject('tabs');
const isTabActive = inject('isTabActive');
const numberOfPanels = inject('numberOfPanels');

const index = numberOfPanels.value;
numberOfPanels.value++;
</script>

<style lang="scss" scoped></style>
