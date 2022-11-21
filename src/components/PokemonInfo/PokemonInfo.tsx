import React, { FC, useEffect, useReducer } from "react";
import { fetchPokemon } from "../../fetchPokemon";
import {
  AsyncAction,
  AsyncState,
  PokemonData,
} from "../../types";
import PokemonInfoView from "./PokemonInfoView";
import PokeBall from "../PokeBall";
import useAsync from "../../utils/useAsync";

interface PokemonInfoPorps {
  pokemonName: string;
}

function pokemonInfoReducer(
  state: AsyncState<PokemonData>,
  action: AsyncAction<PokemonData>
): AsyncState<PokemonData> {
  switch (action.type) {
    case "pending": {
      return { status: "pending", data: null, error: null };
    }
    case "resolved": {
      return { status: "resolved", data: action.data, error: null };
    }
    case "rejected": {
      return { status: "rejected", data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const PokemonInfo: FC<PokemonInfoPorps> = ({ pokemonName }) => {
  const state = useAsync(
    () => {
      if (!pokemonName) return;
      return fetchPokemon(pokemonName);
    },
    pokemonInfoReducer,
    [pokemonName]
  );

  const { data: pokemon, status, error } = state;
  switch (status) {
    case "idle":
      return <PokeBall status={status} />;
    case "pending":
      return <PokeBall status={status} />;
    case "rejected":
      throw error;
    case "resolved":
      return (
        <div style={{ display: "grid", placeContent: "center" }}>
          <PokeBall status={status} />
          <PokemonInfoView pokemon={pokemon} />
        </div>
      );

    default:
      throw new Error("but...how?");
  }
};

export default PokemonInfo;
