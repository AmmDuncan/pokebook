import { useQuery } from "@tanstack/vue-query";
import { usePokemonList } from "~/composables/usePokemonList";
import { searchPokemon } from "~/utils/helpers";
import { fetchOnePokemon } from "~/services/pokemon";
import { PokemonModel } from "~/models/Pokemon";

export const usePokemonPage = ({ initialQuery = {} } = {}) => {
  const query = reactive({ page: 1, page_size: 8, search: "", ...initialQuery });
  const filteredCount = ref(0);

  const { data: pokemonList } = usePokemonList();

  async function fetchPagePokemonDetails() {
    const hasKeyword = searchPokemon(query.search, pokemonList.value);
    filteredCount.value = hasKeyword.length;
    const pageSliceStartIndex = (query.page - 1) * query.page_size;
    const pageSliceEndIndex = pageSliceStartIndex + query.page_size;
    const filteredList = hasKeyword.slice(pageSliceStartIndex, pageSliceEndIndex);
    return Promise.all(filteredList.map(async (pokemon) => fetchOnePokemon({ url: pokemon.url })));
  }

  return {
    ...useQuery({
      enabled: computed(() => Boolean(pokemonList.value)),
      queryKey: ["pokemon-page", query],
      queryFn: fetchPagePokemonDetails,
      select: (res) => (res.map(item => new PokemonModel(item).details))
    }),
    query,
    count: filteredCount
  };
};