import ColorThief from "colorthief";

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
  const brokenDownKeyword = keyword.trim().toLowerCase().split(" ");
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

/**
 * Get dominant color and color palette in an image
 * @param {string} imageUrl - link to image
 * @param {function} callback - function to call when color is ready
 * @author Ammiel Yawson <ammielyawson.com>
 */
export function getColorInfo(imageUrl, callback) {
  const img = document.createElement("IMG");
  const quality = 10;
  const colorThief = new ColorThief();
  img.setAttribute("src", imageUrl);
  img.crossOrigin = "Anonymous";
  if (img.complete) {
    callback(colorThief.getColor(img, quality), colorThief.getPalette(img, quality));
  } else {
    img.addEventListener("load", function () {
      callback(colorThief.getColor(img, quality), colorThief.getPalette(img, quality));
    });
  }
}