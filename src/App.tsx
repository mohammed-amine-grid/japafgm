import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <SearchInput  />
      <div className='pokmeon-info'>
        <PokemonErrorBoundary>
          <PokemonInfo />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
