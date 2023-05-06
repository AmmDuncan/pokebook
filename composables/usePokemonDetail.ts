import { PokemonModel } from "~/models/Pokemon";

export const usePokemonDetail = () => {
  const viewing = ref(false);
  const pokemon = ref<PokemonModel["details"] | null>(null)

  const view = (detail: PokemonModel["details"]) => {
    viewing.value = true;
    pokemon.value = detail;
  }

  const close = () => {
    viewing.value = false;
    setTimeout(() => pokemon.value = null, 300);
  }

  return {
    viewing,
    pokemon,
    view,
    close,
  }
}