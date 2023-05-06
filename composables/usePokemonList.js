import { useQuery } from "@tanstack/vue-query";
import { fetchPokemonList } from "~/services/pokemon";

export const usePokemonList = ({ config } = {}) => {
  return useQuery({
    queryKey: ["pokemon-list"],
    queryFn: () => fetchPokemonList({query: {limit: 1200}}),
    select: (res) => res.results,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};