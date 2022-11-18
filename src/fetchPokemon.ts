// type fetchPokemon = (name: string) => Promise<Response>
import { PokemonData } from "./types";

type JSONResponse = {
  data?: {
    pokemon: PokemonData;
  };
  errors?: Array<{ message: string }>;
};

export const fetchPokemon = async (
  name: string
): Promise<PokemonData | undefined> => {
  const pokemonQuery = `
    query PokemonInfo($name:String) {
        pokemon(name:$name) {
          name
          image
          types
          classification
          weaknesses
          maxHP
          maxCP 
        }
    }
    `;

  const response = await fetch("https://graphql-pokemon2.vercel.app/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query: pokemonQuery,
      variables: { name: name.toLowerCase() },
    }),
  });

  const { data, errors }: JSONResponse = await response.json();
  if (response.ok) {
    const pokemon = data?.pokemon;
    if (pokemon) {
      return pokemon;
    } else {
      return Promise.reject(new Error(`No pokemon with the name "${name}"`));
    }
  } else {
    // handle the graphql errors
    const error = new Error(
      errors?.map((e) => e.message).join("\n") ?? "unknown"
    );
    return Promise.reject(error);
  }
};
