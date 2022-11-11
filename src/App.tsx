import { useState } from 'react'
import SearchForm from './components/SearchForm'
import PokemonInfo from './components/PokemonInfo'
import './App.scss'


function App() {

  return (
    <div className="App">
     
      <SearchForm pokemonName='' onSubmit={() => console.log('hi')
      } />
      <div className='pokemon-info'>
        <PokemonInfo />
        {/* <PokemonErrorBoundary>
        </PokemonErrorBoundary> */}
      </div>
    </div>
  )
}

export default App
