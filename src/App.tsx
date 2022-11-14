import { useState } from "react";
import SearchForm from "./components/SearchForm";
import PokemonInfo from "./components/PokemonInfo/PokemonInfo";
import { PokemonErrorBoundary } from "./components/PokemonInfo/PokemonInfoFallback";
import "./App.scss";

function App() {
  const [pokemonName, setPokemonName] = useState("");

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName);
    
    
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="App">
      <SearchForm pokemonName={pokemonName}  onSubmit={handleSubmit} />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
      
        <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary> 
      </div>
    </div>
  );
}

export default App;
