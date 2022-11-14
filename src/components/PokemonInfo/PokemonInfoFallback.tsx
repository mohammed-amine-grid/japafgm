import React, { useRef } from "react";
import PokemonInfoView from "./PokemonInfoView";
import { PokemonData } from "../../types";
import type {FallbackProps, ErrorBoundaryProps} from 'react-error-boundary'
import {ErrorBoundary} from 'react-error-boundary'
const PokemonInfoFallback = ({ name }: { name: string }) => {
  const initialName = useRef(name).current;
  const fallbackPokemonData: PokemonData = {
    name: initialName,
    image: "/img/pokemon/fallback-pokemon.jpg",
    types: ["XXX", "XXX"],
  };
  return <PokemonInfoView pokemon={fallbackPokemonData} />;
};


function ErrorFallback({error, resetErrorBoundary}: FallbackProps) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function PokemonErrorBoundary(
  props: Pick<ErrorBoundaryProps, 'onReset' | 'resetKeys'> & {
    children: React.ReactNode
  },
) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />
}

export  {
    PokemonErrorBoundary,
    PokemonInfoFallback,
    ErrorFallback
}
