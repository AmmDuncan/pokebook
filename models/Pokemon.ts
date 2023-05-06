export class PokemonModel {
  constructor(private _remotePokemon: RemotePokemon) {
  }

  get details() {
    return {
      id: this._remotePokemon.id,
      image: this._remotePokemon.sprites?.other?.dream_world?.front_default ?? this._remotePokemon.sprites?.other?.["official-artwork"].front_default,
      abilities: this._remotePokemon.abilities,
      name: this._remotePokemon.name,
      types: this._remotePokemon.types,
      weight: this._remotePokemon.weight,
      stats: this._remotePokemon.stats,
    }
  }
}

export type PokemonAbility = {
  "ability": {
    "name": string,
    "url": string
  },
  "is_hidden": boolean,
  "slot": number
}

export type PokemonStat =  {
  "base_stat": number,
  "effort": number,
  "stat": {
    "name": string,
    "url": string
  }
}

export type PokemonType = {
  "slot": number,
  "type": {
    "name": string,
    "url": string
  }
}

type RemotePokemon = {
  "abilities": PokemonAbility[],
  "base_experience": number,
  "height": number,
  "held_items": any[],
  "id": number,
  "is_default": true,
  "location_area_encounters": string,
  "moves": any[],
  "name": string,
  "order": number,
  "past_types": [],
  "species": {
    "name": string,
    "url": string
  },
  "sprites": {
    "back_default": string,
    "back_female": null,
    "back_shiny": string,
    "back_shiny_female": null,
    "front_default": string,
    "front_female": null,
    "front_shiny": string,
    "front_shiny_female": null,
    "other": {
      "dream_world": {
        "front_default": string,
        "front_female": null
      },
      "home": {
        "front_default": string,
        "front_female": null,
        "front_shiny": string,
        "front_shiny_female": null
      },
      "official-artwork": {
        "front_default": string,
        "front_shiny": string
      }
    },
    "versions": {}
  },
  "stats": PokemonStat[],
  "types": PokemonType[],
  "weight": 130
}