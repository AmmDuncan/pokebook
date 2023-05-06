<script lang="ts" setup>
import { generateDottedPages } from "~/utils/generate-dotted-pagination";

const props = defineProps<{
  page: number,
  pageSize: number,
  total: number,
}>();

const emit = defineEmits<{
  (e: "update:page", page: number): void
}>();

const totalPages = computed(() => Math.ceil(isNaN(props.total) ? 1 : props.total / props.pageSize));
const steps = computed(() => generateDottedPages({
  page: props.page, totalPages: totalPages.value
}));

const handleNext = () => {
  if (props.page < totalPages.value) {
    emit("update:page", props.page + 1);
  }
};

const handlePrevious = () => {
  if (props.page > 1)
    emit("update:page", props.page - 1);
};
</script>

<template>
  <div class="flex flex-wrap space-x-2">
    <button
      :class="{'hover:bg-neutral-300 active:bg-neutral-200': page !== 1}"
      :disabled="page === 1"
      class="bg-neutral-200"
      @click="handlePrevious">
      <IconsCaretLeft />
    </button>

    <Highlight class="inline-flex flex-wrap space-x-2">
      <template v-for="step in steps" :key="step">
        <span v-if="step === '...'" class="block h-10 text-3xl text-neutral-800">{{ step }}</span>
        <button v-else :class="[{
          ['bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-200']: step !== page,
          ['bg-current']: step === page
        }]" @click="emit('update:page', step)">
          <Text :class="[step === page ? 'text-white' : 'text-neutral-800']" as-heading variant="h2" weight="medium">
            {{ step }}
          </Text>
        </button>
      </template>
    </Highlight>

    <button
      :class="{'hover:bg-neutral-300 active:bg-neutral-200': page !== totalPages}"
      :disabled="page === totalPages"
      class="bg-neutral-200"
      @click="handleNext">
      <IconsCaretLeft class="rotate-180" />
    </button>
  </div>
</template>

<style scoped>
button {
    --size: 40px;
    display: grid;
    place-content: center;
    height: var(--size);
    min-width: var(--size);
    padding: 4px 8px;
    border-radius: 8px;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
}
</style>