<script lang="ts" setup>
import { PokemonModel } from "~/models/Pokemon";

const { type } = defineProps<{
  type: PokemonModel["details"]["types"][number]
}>();

const typeName = computed(() => type.type.name);
</script>

<template>
  <div class="pokemon-type space-x-1 py-1 px-4 rounded-full bg-[#EEEEEE]">
    <span>{{ POKEMON_TYPES[typeName] }}</span>
    <span class="capitalize">{{ typeName }}</span>
  </div>
</template>

<style scoped>

</style>