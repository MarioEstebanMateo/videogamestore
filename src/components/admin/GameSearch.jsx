import React, { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Search, Loader } from 'lucide-react'
import * as api from '../../services/thegamesdb'

const GameSearch = ({ onSelectGame }) => {
  const { isDark } = useTheme()
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) return

    setLoading(true)
    setError('')
    setResults([])

    try {
      const games = await api.searchGamesTheGamesDB(searchTerm)
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
            // Handle different image sources from TheGamesDB
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
                    <h3 className="font-semibold">{game.game_title}</h3>
                    {game.release_date && <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Released: {game.release_date}</p>}
                    {game.rating && <p className="text-yellow-400 text-sm">⭐ {game.rating}</p>}
                    {game.genres && <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{Array.isArray(game.genres) ? game.genres.join(', ') : game.genres}</p>}
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
