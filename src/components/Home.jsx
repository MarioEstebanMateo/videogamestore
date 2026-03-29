import React, { useState } from 'react'
import { searchGames } from '../services/api'
import SearchBar from './SearchBar'
import GameCard from './GameCard'

const Home = () => {
  const [games, setGames] = useState([])
  const [error, setError] = useState(null)
  const [searching, setSearching] = useState(false)

  const handleSearch = async (gameName) => {
    try {
      setSearching(true)
      setError(null)
      const results = await searchGames(gameName)
      setGames(results)
    } catch (err) {
      setError(err.message)
    } finally {
      setSearching(false)
    }
  }

  return (
    <div>
      <h1>Video Game Store by Mario</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && <p>Error: {error}</p>}
      
      {searching && <p>Buscando...</p>}
      
      {games.length > 0 && (
        <div>
          <h2>Resultados: {games.length}</h2>
          <div>
            {games.map((game, index) => (
              <GameCard key={game.id || index} game={game} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home