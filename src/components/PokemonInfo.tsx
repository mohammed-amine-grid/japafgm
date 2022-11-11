import { FC, useCallback } from "react";
interface PokemonInfoProps {}

const PokemonInfo: FC<PokemonInfoProps> = () => {
  const fetchPokemons = (name: string) => {
    const pokemongQuery = `
    query PokemonInfo($name:String) {
        pokemon(name:$name) {
            name
            image
            types
        }
    }
    `;

   

    fetch("https://graphql-pokemon2.vercel.app/", {method:"POST", headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query:pokemongQuery,
      variables: {name:name.toLowerCase}
    })
  }).then(async response => {
    const data = await response.json();
    if(response.ok) {
      const pokemon = data?.pokemon;
      if(pokemon) {
        return pokemon
      }
      else {
        return Promise.reject(new Error(`No pokemon with the name "${name}"`))
      }
    }
   
  });

  };

  return (
    <div className="PokemonInfo">
      <h1></h1>
    </div>
  );
};

export default PokemonInfo;
