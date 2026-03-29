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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Video Game Store by Mario</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {error && <p className="text-red-500 text-center mt-4">Error: {error}</p>}
      
      {searching && <p className="text-center mt-4">Searching...</p>}
      
      {games.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Results: {games.length}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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