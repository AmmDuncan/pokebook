import { api } from "~/utils/api";
import { getQueryString } from "~/utils/helpers";

export const fetchPokemonList = ({query} = {}) => api.get(`https://pokeapi.co/api/v2/pokemon?${getQueryString(query)}`)

export const fetchOnePokemon = ({url}) => api.get(url)