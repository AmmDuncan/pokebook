<script lang="ts" setup>
import { PokemonModel } from "~/models/Pokemon";
import TabsProvider from "~/components/tabs/TabsProvider.vue";
import PokemonAbout from "~/components/pokemon/PokemonAbout.vue";
import { getColorInfo } from "~/utils/helpers";

const props = defineProps<{
  pokemon: PokemonModel["details"];
}>();

const emit = defineEmits<{
  (e: "close"): void
}>();

const tabs = ["About", "Stats", "Similar"];
const activeTab = ref(tabs[0]);

const dominantColor = ref<number[] | null>(null);
const colorList = ref<Array<number[]>>([]);
const paletteSize = 5;

getColorInfo(props.pokemon.image, (color: number[], palette: Array<number[]>) => {
  colorList.value = palette.slice(0, paletteSize) as Array<number[]>;
  dominantColor.value = color;
});

const coverGradientStyles = computed(() => {
  if (!dominantColor.value) return "";

  const factor = 20;
  const lighter = dominantColor.value.map(v => v + factor);
  const darker = dominantColor.value.map(v => v - factor);

  return `--lighter: rgb(${lighter}); --middle: rgb(${dominantColor.value}); --darker: rgb(${darker});`;
});
</script>

<template>
  <TabsProvider v-model:active-tab="activeTab" :tabs="tabs">
    <div class="w-full h-[100vh] flex flex-col">
      <main class="p-4 flex-grow-1 h-full overflow-auto">
        <div :class="{'dominant-color': dominantColor}" :style="dominantColor ? coverGradientStyles : ''"
             class="cover relative shadow-inner rounded-2xl p-3 bg-neutral-200">
          <button class="back-button absolute rounded-lg top-3 left-3 w-16 h-16 bg-white shadow-lg"
                  @click="emit('close')">
            <IconsArrowLeft />
          </button>

          <img :src="pokemon.image" alt=""
               class="absolute -bottom-[20%] left-2/4 -translate-x-1/2 w-8/12 h-[90%] object-contain pointer-events-none">

          <div class="palette shadow-md border border-4 border-white w-max flex rounded-full">
            <button
              v-for="(colorItem, index) in colorList"
              :key="colorItem"
              :class="{'rounded-l-full': index === 0, 'rounded-r-full': index === colorList.length - 1}"
              :style="`background: rgb(${colorItem})`"
              class="w-5 h-5"
              @click="dominantColor = colorItem"
            />
          </div>
        </div>
        <Text as-heading class="text-center mt-16" variant="h1">{{ pokemon.name }}</Text>
        <div class="flex justify-center mt-2 mb-10">
          <PokemonType v-for="type in pokemon.types" :key="type.type.name" :type="type" />
        </div>

        <div class="content-outlet flex flex-col w-full mb-10">

          <div class="header relative flex flex-col items-stretch text-center">
            <div class="line" />
            <Text as="h3" as-heading class="py-3 bg-white" variant="h2">{{ activeTab }}</Text>
            <div class="line" />
          </div>

          <div class="tab-content py-5">
            <TabsPanel>
              <PokemonAbout :pokemon="pokemon" />
            </TabsPanel>
            <TabsPanel>
              <PokemonStats :pokemon="pokemon" />
            </TabsPanel>
            <TabsPanel></TabsPanel>
          </div>
          <div class="line" />

        </div>

      </main>
      <aside class="tabs-container flex-grow-0 bg-white p-4">
        <Tabs class="w-max mx-auto" />
      </aside>
    </div>
  </TabsProvider>
</template>

<style lang="postcss" scoped>
.line {
    @apply h-0.5 bg-gradient-to-r from-white via-neutral-200 to-white
}

.back-button {
    display: grid;
    place-content: center;
}

.cover {
    padding-block-start: max(54%, 280px);

    &.dominant-color {
        background-image: linear-gradient(to bottom, var(--lighter), var(--middle), var(--darker));
    }
}

.tabs-container {
    box-shadow: 0px 0px 94px rgba(0, 0, 0, 0.07);
}

.header {
    background: white;

    &:after {
        position: absolute;
        z-index: 0;
        content: '';
        top: -50%;
        width: 70%;
        height: 2rem;
        background: hsla(0, 0%, 0%, 0.2);
        left: 50%;
        transform: translateX(-50%);
        filter: blur(3rem)
    }

    h3 {
        position: relative;
        z-index: 1;
    }
}

.tab-content {
    @apply bg-gradient-to-r from-white via-neutral-200/60 to-white;
}

.palette {
    position: absolute;
    left: 12px;

    @media (min-width: 768px) {
        bottom: 12px;
    }
}
</style>