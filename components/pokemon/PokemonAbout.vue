<script lang="ts" setup>
import { PokemonModel } from "~/models/Pokemon";

const props = defineProps<{
  pokemon: PokemonModel["details"];
}>();

const sharedProps = { asHeading: true, variant: "h3" };
const labelProps = { ...sharedProps, class: "text-right", weight: "normal" };
const valueProps = { ...sharedProps };

const height = computed(() => `${(props.pokemon.height / 10).toFixed(1)}m`);
const weight = computed(() => `${(props.pokemon.weight / 10).toFixed(1)}kg`)
</script>

<template>
  <div class="row">
    <Text v-bind="labelProps">Height</Text>
    <Text v-bind="valueProps">{{ height }}</Text>
  </div>

  <div class="line"></div>

  <div class="row">
    <Text v-bind="labelProps">Weight</Text>
    <Text v-bind="valueProps">{{ weight }}</Text>
  </div>

  <div class="line"></div>

  <div class="row">
    <Text v-bind="labelProps">Abilities</Text>
    <Text v-bind="valueProps" as="div">
      <ul class="list-disc pl-5">
        <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
          {{ability.ability.name}}
        </li>
      </ul>
    </Text>
  </div>
</template>

<style lang="scss" scoped>
.line {
  @apply w-8/12 mx-auto my-1.5 h-0.5 bg-gradient-to-r from-white via-neutral-300/60 to-white
}

.row {
  display: grid;
  grid: 1fr / repeat(2 , 1fr);
  gap: 32px;
}
</style>