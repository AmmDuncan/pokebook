<template>
  <HeadlessTransitionRoot
    :name="`modal-${variant}`"
    :show="show"
    as="template"
  >
    <HeadlessDialog @close="emit('close')">
      <!--  OVERLAY  -->
      <HeadlessTransitionChild
        as="template"
        enter="duration-200 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-100 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          aria-hidden="true"
          class="fixed z-50 inset-0 bg-black/40"
        />
      </HeadlessTransitionChild>

      <!--  CONTENT  -->
      <div
        :class="{
          'justify-center items-center py-10 ': variant === 'center',
          'justify-end items-stretch inset-0 left-auto': variant === 'side',
          [classes?.panelWrapper]: true
        }"
        class="fixed z-50 grid inset-0 overflow-y-auto"
      >
        <HeadlessTransitionChild
          as="template"
          v-bind="transitions[variant]"
        >
          <HeadlessDialogPanel
            :class="[{ 'overflow-hidden': overflowHidden }, classes?.panel, variant]"
            class="panel bg-white h-max min-w-[300px] max-w-[100vw]"
            @click.stop
          >
            <div
              v-if="!headerHidden"
              :class="[classes?.titleBar, { 'border-b border-b-grey-300/50': headerBorder }]"
              class="title-bar"
            >
              <HeadlessDialogTitle
                :class="[classes?.title]"
                class="p-3 text-lg font-semibold"
              >
                {{ title }}
              </HeadlessDialogTitle>
              <button
                :class="[classes?.closeButton]"
                class="grid place-content-center w-8 h-8"
                @click="emit('close')"
              >
                X
              </button>
            </div>
            <slot />
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>

<script>
export default {
  name: "ModalComponent"
};
</script>
<script setup>
defineProps({
  title: {
    type: [String],
    default: ""
  },
  show: {
    type: Boolean,
    default: false
  },
  overflowHidden: {
    type: Boolean,
    default: false
  },
  headerHidden: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: "center",
    validator: (v) => ["center", "side"].includes(v)
  },
  headerBorder: {
    type: Boolean,
    default: true
  },
  classes: {
    type: Object,
    default: () => ({
      panelWrapper: undefined,
      panel: undefined,
      title: undefined,
      titleBar: undefined,
      closeButton: undefined
    })
  }
});

const emit = defineEmits(["close"]);

const transitions = {
  center: {
    enter: "duration-300 ease-out",
    "enter-from": "opacity-0 scale-75",
    "enter-to": "opacity-100 scale-100",
    leave: "duration-150 ease-in",
    "leave-from": "opacity-100 scale-100",
    "leave-to": "opacity-0 scale-75"
  },
  side: {
    enter: "duration-300 ease-out",
    "enter-from": "opacity-0 translate-x-20",
    "enter-to": "opacity-100 translate-x-0",
    leave: "duration-150 ease-in",
    "leave-from": "opacity-100 translate-x-0",
    "leave-to": "opacity-0 translate-x-20"
  }

};
</script>

<style lang="postcss" scoped>
.title-bar {
    @apply w-full p-5 py-2;
    @apply flex justify-between items-center space-x-2;
    @apply bg-white;
}

.center {
    .title-bar {
        @apply rounded-t-xl;
    }
}

.panel {
    &.center {
        @apply rounded-xl;
    }

    &.side {
        .title-bar {
            position: sticky;
            top: 0;
        }

        height: 100%;
        display: grid;
        grid: max-content auto / 1fr;
    }
}
</style>
