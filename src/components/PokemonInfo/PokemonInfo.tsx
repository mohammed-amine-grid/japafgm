import React, { FC, useEffect, useReducer } from "react";
import { fetchPokemon } from "../../fetchPokemon";
import { PokemonData } from "../../types";
import PokemonInfoView from "./PokemonInfoView";
import PokeBall from '../PokeBall'

interface PokemonInfoPorps {
  pokemonName: string;
}

type PokemonInfoState =
  | {
      status: "idle";
      pokemon?: null;
      error?: null;
    }
  | {
      status: "pending";
      pokemon?: null;
      error?: null;
    }
  | {
      status: "resolved";
      pokemon: PokemonData;
      error: null;
    }
  | {
      status: "rejected";
      pokemon: null;
      error: Error;
    };

type PokemonInfoAction =
  | { type: "pending" }
  | { type: "resolved"; pokemon: PokemonData }
  | { type: "rejected"; error: Error }
  | { type?: never };

function pokemonInfoReducer(
  state: PokemonInfoState,
  action: PokemonInfoAction
): PokemonInfoState {
  switch (action.type) {
    case "pending": {
      return { status: "pending", pokemon: null, error: null };
    }
    case "resolved": {
      return { status: "resolved", pokemon: action.pokemon, error: null };
    }
    case "rejected": {
      return { status: "rejected", pokemon: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const PokemonInfo: FC<PokemonInfoPorps> = ({ pokemonName }) => {
  const [state, dispatch] = useReducer(pokemonInfoReducer, {
    status: "idle",
    pokemon: null,
    error: null,
  });

  useEffect(() => {
    if (!pokemonName) return;

    dispatch({ type: "pending" });

    fetchPokemon(pokemonName).then(
      (pokemon) => {
        dispatch({ type: "resolved", pokemon });
        console.log(pokemon);
      },
      (error) => dispatch({ type: "rejected", error })
    );
  }, [pokemonName]);

  const { pokemon, status, error } = state;
  switch (status) {
    case "idle":
      return <PokeBall status={status} />;
    case "pending":
      return <PokeBall status={status} />;
    case "rejected":
      throw error;
    case "resolved":
      return <div style={{display:'grid', placeContent:'center'}}>
      <PokeBall status={status} />
      <PokemonInfoView  pokemon={pokemon} />
      </div>

    default:
      throw new Error("but...how?");
  }
};

export default PokemonInfo;
