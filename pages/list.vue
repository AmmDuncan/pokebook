<script lang="ts" setup>
import { usePokemonPage } from "~/composables/usePokemonPage";
import { PokemonModel } from "~/models/Pokemon";
import Placeholder from "~/components/Placeholder.vue";
import { asNumber } from "~/utils/helpers";

const route = useRoute();
const initialQuery = {
  page: asNumber(route.query.page) ?? 1,
  page_size: asNumber(route.query.page_size) ?? 8,
  search: route.query.search ?? ""
};
const { data, isLoading, query, count } = usePokemonPage({ initialQuery });

const pokemonList = computed(() => data.value ?? []);

watch(query, () => {
  navigateTo({
    ...route,
    query: {
      ...route.query,
      search: query.search,
      page: query.page,
      page_size: query.page_size
    }, replace: true
  });
});

watch([() => query.search, () => query.page_size], () => {
  query.page = 1;
});

</script>

<template>
  <div class="root">
    <Navbar v-model:search="query.search" />
    <div class="bound">
      <Placeholder v-if="!isLoading && !pokemonList.length">
        <Text as-heading variant="h2">I'm sorryyy!!
          <Highlight>!</Highlight>
        </Text>
        <Text>I couldn't find any Pokémon <span v-if="query.search">matching
          <Highlight>"{{ query.search }}"</Highlight></span>
          <span v-else-if="query.page">on <Highlight>page {{query.page}}</Highlight></span>
        </Text>
      </Placeholder>

      <Loader v-else-if="isLoading" class="h-[740px]" />

      <div v-else class="pokemon-container mt-24 lg:mt-62">
        <PokemonCard
          v-for="pokemon in pokemonList as Array<PokemonModel['details']>"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>

      <ClientOnly>
        <Pagination
          v-if="count"
          v-model:page="query.page"
          :page-size="query.page_size"
          :total="count as number"
          class="pb-28"
        />
      </ClientOnly>
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