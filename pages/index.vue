<script lang="ts" setup>

import { usePokemonList } from "~/composables/usePokemonList";

const search = ref("");

const handleSearch = () => {
  navigateTo({ path: "/list", query: { search: search.value } });
};

</script>

<template>
  <div class="bound">
    <div class="home flex flex-col justify-center items-center py-32">
      <img alt="" class="w-9/12 mx-auto max-w-[382px]" src="~/assets/images/logo-illustration.png">
      <Text as-heading class="my-2" variant="h1">Poké
        <Highlight>book</Highlight>
      </Text>
      <Text class="max-w-[370px] text-center mb-24">Largest Pokémon index with information about every Pokemon you can
        think of.
      </Text>
      <HomeSearch v-model="search" :input-props="{placeholder: 'Enter pokemon name'}" class="max-w-[536px] w-11/12"
                  @search="handleSearch" />
      <NuxtLink class="mt-4 text-lg font-medium underline" to="/list">View All</NuxtLink>
    </div>
  </div>
</template>

<style scoped>
</style>