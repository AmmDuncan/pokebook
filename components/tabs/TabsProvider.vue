<template>
  <slot />
</template>

<script setup>
import useTabs from "~/composables/useTabs";

const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },
  defaultActiveTab: {
    type: [String, Number],
    default: undefined
  },
  activeTab: {
    type: [String, Number],
    default: undefined
  },
  trackInRoute: Boolean,
  replace: Boolean,
});

const emit = defineEmits(['change', 'update:activeTab'])

const {
  activeTab,
  setActiveTab,
  isTabActive
} = useTabs(props.tabs, {
  defaultActiveTab: props.defaultActiveTab ?? props.activeTab,
  trackInRoute: props.trackInRoute,
  replace: props.replace
});

// handle changing activeTab from outside
watch(() => props.activeTab, (val) => {
  if (val !== activeTab.value) activeTab.value = val
})


provide("activeTab", activeTab);
provide("setActive", modSetActiveTab);
provide("isTabActive", isTabActive);
provide("tabs", props.tabs);

// Get TabsPanels
const numberOfPanels = ref(0);
provide("numberOfPanels", numberOfPanels);

function modSetActiveTab(val) {
  setActiveTab(val)
  emit('change', val);
  emit('update:activeTab', val)
}
</script>

<style lang="scss" scoped></style>
