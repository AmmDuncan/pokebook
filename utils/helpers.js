export function objectToQuery(obj) {
  if (!obj) throw Error("objectToQuery expects an object");
  return Object.entries(obj).reduce((query, cur) => {
    const [key, value] = cur;
    if (value) {
      query.set(key, value);
    }
    return query;
  }, new URLSearchParams());
}


export function getQueryString(query) {
  if (!query) return "";
  return objectToQuery(query);
}

export function searchPokemon(keyword, pokemonList) {
  if (!keyword.trim()) return pokemonList
  const brokenDownKeyword = keyword.trim().split(" ");
  const searchPieceInName = (name) => brokenDownKeyword.map(piece => name.includes(piece)).every(Boolean);
  return pokemonList.filter((pokemon) => searchPieceInName(pokemon.name));
}

export function getDeep(inputObj, path) {
  const pathArr = Array.isArray(path) ? path : path?.split(".");

  let obj = inputObj?.[pathArr.shift()];
  while (obj && pathArr.length > 0) {
    obj = obj?.[pathArr.shift()];
  }
  return obj;
}

export function asNumber(value) {
  const converted = Number(value)
  return isNaN(converted) ? null : converted;
}