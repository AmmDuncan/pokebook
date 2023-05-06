<template>
  <div
    :class="{ full }"
    class="tabs rounded-full flex text-base p-2 bg-neutral-200/60 space-x-2"
  >
    <button
      v-for="(tab, index) in tabs"
      :key="index"
      :class="[ isTabActive(tab.value ?? tab) ? 'bg-white active shadow' :'hover:bg-neutral-400/20',  tabClass]"
      class="tab px-4 md:px-10 py-3 rounded-full"
      @click="setActive(tab.value ?? tab)"
    >
      <Text weight="medium">{{ tab.name ?? tab }}</Text>
    </button>
  </div>
</template>
<script>
export default {
  name: "TabsComponent"
};
</script>
<script setup>
defineProps({
  full: Boolean,
  tabClass: {
    type: [String, Array, Object],
    default: undefined
  }
});

const setActive = inject("setActive");
const isTabActive = inject("isTabActive");
const tabs = inject("tabs");
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1) inset;
}

.tab {
  --active-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  flex: 1 0 auto;
  position: relative;
  font-weight: 500;
  transition: background-color 200ms ease;

  &.active {
    //box-shadow: var(--active-shadow);
  }

  &:hover, &:active {
    transform: none;
  }
}
</style>
