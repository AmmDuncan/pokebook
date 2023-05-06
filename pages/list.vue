<script lang="ts" setup>
import { usePokemonPage } from "~/composables/usePokemonPage";
import { PokemonModel } from "~/models/Pokemon";
import Placeholder from "~/components/Placeholder.vue";

const route = useRoute();
const initialQuery = { page: 1, page_size: 8, search: route.query.search ?? "" };
const { data, isLoading, query, count } = usePokemonPage({ initialQuery });

const pokemonList = computed(() => data.value ?? []);

watch(() => query.search, (val) => {
  navigateTo({ ...route, query: { ...route.query, search: val }, replace: true });
});

watch([() => query.search, () => query.page_size], () => {
  query.page = 1;
})

</script>

<template>
  <div class="root">
    <Navbar v-model:search="query.search" />
    <div class="bound">
      <Placeholder v-if="!isLoading && !pokemonList.length && query.search">
        <Text variant="h2" as-heading>I'm sorryyy!!<Highlight>!</Highlight></Text>
        <Text>I couldn't find a Pokémon matching <Highlight>"{{query.search}}"</Highlight></Text>
      </Placeholder>

      <Loader v-else-if="isLoading" class="h-[776px]" />

      <div v-else class="pokemon-container mt-24 lg:mt-62">
        <PokemonCard
          v-for="pokemon in pokemonList as Array<PokemonModel['details']>"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>

      <Pagination
        :key="query.page"
        v-if="count"
        v-model:page="query.page"
        :page-size="query.page_size"
        :total="count as number"
        class="pb-28"
      />
    </div>
  </div>
</template>

<style scoped>
.root {
    min-height: 100vh;
    min-height: 100svh;
    background: #f6f6f6;
}

.pokemon-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 280px));
    gap: 80px 20px;
    justify-content: center;
    padding-block-end: 3.5rem;
}
</style>