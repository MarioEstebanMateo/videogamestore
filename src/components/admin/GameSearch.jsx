import React, { useState, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Search, Loader } from 'lucide-react'
import * as api from '../../services/rawg'

const GameSearch = ({ onSelectGame, clearTrigger }) => {
  const { isDark } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Clear search when clearTrigger changes
  useEffect(() => {
    setSearchTerm('')
    setResults([])
    setError('')
  }, [clearTrigger])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setLoading(true)
    setError('')
    setResults([])

    try {
      const games = await api.searchGamesRAWG(searchTerm)
      setResults(games)
    } catch (err) {
      setError(err.message || 'Error searching games')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border rounded-lg p-6 mb-8`}>
      <h2 className="text-2xl font-bold mb-4">Search Games</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search game title..."
          className={`flex-1 px-4 py-3 rounded border-2 ${isDark ? 'bg-slate-700 border-slate-600 focus:border-blue-500' : 'bg-white border-slate-200 focus:border-blue-500'} focus:outline-none transition-colors`}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader size={20} className="animate-spin" /> : <Search size={20} />}
          Search
        </button>
      </form>

      {error && (
        <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded mb-4">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className={`space-y-2 max-h-96 overflow-y-auto`}>
          {results.map((game, idx) => {
            // Get image URL from game data
            let imageUrl = null;
            if (game.box_art?.thumb) {
              imageUrl = game.box_art.thumb;
            } else if (game.box_art) {
              imageUrl = game.box_art;
            } else if (game.images && game.images.length > 0) {
              imageUrl = game.images[0].thumb || game.images[0];
            }
            
            return (
              <div
                key={`${game.id || idx}`}
                onClick={() => onSelectGame(game)}
                className={`p-4 rounded cursor-pointer transition-colors ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'} border ${isDark ? 'border-slate-600' : 'border-slate-200'}`}
              >
                <div className="flex gap-4">
                  {imageUrl ? (
                    <img src={imageUrl} alt={game.game_title} className="w-16 h-20 object-cover rounded" onError={(e) => {e.target.style.display = 'none'}} />
                  ) : (
                    <div className="w-16 h-20 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-sm text-center">No image</div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{game.game_title}</h3>
                    {game.overview && (
                      <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'} line-clamp-2`}>
                        {game.overview.length > 150 ? game.overview.substring(0, 150) + '...' : game.overview}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {game.genres && game.genres.length > 0 && (
                        <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                          {Array.isArray(game.genres) ? game.genres.join(', ') : game.genres}
                        </span>
                      )}
                      {game.platforms && game.platforms.length > 0 && (
                        <span className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-slate-600 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                          Platforms: {Array.isArray(game.platforms) ? game.platforms.join(', ') : game.platforms}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      {game.release_date && (
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          Release: {game.release_date}
                        </p>
                      )}
                      {game.rating && game.rating !== 'Not Rated' && (
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">⭐</span>
                          <span className="text-sm font-medium">{game.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && results.length === 0 && searchTerm && (
        <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          No games found. Try another search.
        </p>
      )}
    </div>
  )
}

export default GameSearch
