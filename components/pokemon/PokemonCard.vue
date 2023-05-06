<script lang="ts" setup>
import { PokemonModel } from "~/models/Pokemon";

defineProps<{
  pokemon: PokemonModel["details"]
}>();
</script>

<template>
  <div class="pokemon-card relative rounded-[20px] p-2.5 pb-7 bg-white">
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
        <button class="w-full px-5 py-3 rounded-[14px] flex justify-between items-center bg-current">
          <span class="text-white">View Pokemon</span>
          <span><IconsEye /></span>
        </button>
      </Highlight>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cta {
  max-height: 0;
  transition: max-height 50ms ease;
}

.pokemon-card {
 filter: drop-shadow(0px 4px 40px rgba(0, 0, 0, 0.06));

  &:hover {
    z-index: 10;
    .cta {
      max-height: 300px;
      transition: max-height 300ms 50ms ease-in;
    }
  }
}
</style>