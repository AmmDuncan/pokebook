<script lang="ts" setup>
import { generateDottedPages } from "~/utils/generate-dotted-pagination";
import { watchDebounced } from "@vueuse/core";

const props = defineProps<{
  page: number,
  pageSize: number,
  total: number,
}>();

const emit = defineEmits<{
  (e: "update:page", page: number): void
}>();

const pageValue = ref(props.page);
const root = ref(null);
const rootChildElementCount = ref(0);

const totalPages = computed(() => Math.ceil(isNaN(props.total) ? 1 : props.total / (asNumber(props.pageSize) ?? 8)));
const steps = computed(() => generateDottedPages({
  page: pageValue.value, totalPages: totalPages.value
}));

watchDebounced(pageValue, () => {
  emit("update:page", pageValue.value);
}, { debounce: 300 });

const handleNext = () => {
  if (pageValue.value < totalPages.value)
    pageValue.value = pageValue.value + 1;
};

const handlePrevious = () => {
  if (pageValue.value > 1)
    pageValue.value = pageValue.value - 1;
};

const handleSetPage = (page: number | string) => {
  pageValue.value = Number(page);
};

const updateChildElementCount = () => {
  rootChildElementCount.value = root.value?.childElementCount;
};
onMounted(() => {
  updateChildElementCount();
});

onUpdated(() => {
  updateChildElementCount();
});
</script>

<template>
  <div ref="root" class="pagination grid">
    <button
      :class="{'hover:bg-neutral-300 active:bg-neutral-200': page !== 1}"
      :disabled="pageValue === 1"
      class="bg-neutral-200"
      @click="handlePrevious">
      <IconsCaretLeft />
    </button>

    <template v-for="(step, index) in steps">
      <span
        v-if="step === '...'"
        :key="index + 'dots'" class="block h-10 w-8 text-center text-3xl text-neutral-800">
        {{ step }}
      </span>
      <Highlight v-else :key="step">
        <button
          :class="{
            ['bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-200']: step !== pageValue,
            ['bg-current']: step === pageValue
          }" @click="handleSetPage(step)">
          <Text :class="[step === pageValue ? 'text-white' : 'text-neutral-800']" as-heading variant="h2"
                weight="medium">
            {{ step }}
          </Text>
        </button>
      </Highlight>
    </template>

    <button
      :class="{'hover:bg-neutral-300 active:bg-neutral-200': pageValue !== totalPages}"
      :disabled="pageValue === totalPages"
      class="bg-neutral-200"
      @click="handleNext">
      <IconsCaretLeft class="rotate-180" />
    </button>
  </div>
</template>

<style scoped>
.pagination {
    width: max-content;
    max-width: 100%;
    gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(44px, max-content));
    justify-items: center;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(v-bind(rootChildElementCount), max-content);
    }
}

button {
    --size: 40px;
    display: grid;
    place-content: center;
    height: var(--size);
    min-width: var(--size);
    padding: 4px 10px;
    border-radius: 8px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
</style>