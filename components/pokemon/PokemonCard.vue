<script lang="ts" setup>
import { PokemonModel } from "~/models/Pokemon";

const props = defineProps<{
  pokemon: PokemonModel["details"]
}>();

const emit = defineEmits<{
  (e: "view"): void
}>();

const focused = ref(false);

const setFocus = (val: boolean) => focused.value = val;
</script>

<template>
  <div
    :class="{focused}"
    class="pokemon-card relative rounded-[20px] p-2.5 pb-7 bg-white"
    @focusout="setFocus(false)"
    @mouseout="setFocus(false)"
    @mouseover="setFocus(true)"
    @click.self="setFocus(true)">
    <div class="image relative rounded-[15px] w-full pt-[55%] bg-neutral-100">
      <img
        :alt="`${pokemon.name} image`"
        :src="pokemon.image"
        class="absolute w-[69%] h-[145%] object-contain left-2/4 -translate-x-1/2 -top-20 object-bottom"
      />
    </div>

    <Text as-heading class="text-center mt-5 mb-2" variant="h2" weight="medium">{{ pokemon.name }}</Text>
    <div class="flex justify-center">
      <PokemonType
        v-for="type in pokemon.types"
        :key="type?.slot"
        :type="type"
        class="mx-1"
      />
    </div>

    <div class="cta absolute overflow-hidden z-10 w-full left-0 top-[95%] bg-white rounded-b-[20px]">
      <Highlight class="w-full block p-2.5">
        <button class="w-full px-5 py-3 rounded-[14px] flex justify-between items-center bg-current"
                @click="emit('view')">
          <span class="text-white">View Pokemon</span>
          <span><IconsEye /></span>
        </button>
      </Highlight>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cta {
  transition: all 100ms ease;
  transform: scaleY(0);
  opacity: 0;
  transform-origin: 0 0;

  /* I prefer the max-height animation
     but it is buggy on safari mobile
     and less performance than the transitions */
  @media (min-width: 768px) {
    max-height: 0;
    opacity: 1;
    transform: none;
  }
}

.pokemon-card {
  filter: drop-shadow(0px 4px 40px rgba(0, 0, 0, 0.06));

  &.focused {
    z-index: 5;

    .cta {
      transition: all 300ms ease;
      opacity: 1;
      transform: scaleY(1);

      @media (min-width: 768px) {
        transition: all 300ms ease-in;
        max-height: 300px;
      }
    }
  }
}
</style>