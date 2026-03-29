import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useTheme } from '../../hooks/useTheme'
import { Plus } from 'lucide-react'
import * as db from '../../services/db'

const GamePublish = ({ selectedGame, onPublished }) => {
  const { isDark } = useTheme()
  const [stock, setStock] = useState(10)
  const [price, setPrice] = useState(49.99)
  const [loading, setLoading] = useState(false)

  const handlePublish = async () => {
    if (!selectedGame) {
      Swal.fire({
        icon: 'warning',
        title: 'No Game Selected',
        text: 'Please select a game first',
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
      return
    }

    if (stock < 0 || price < 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Values',
        text: 'Stock and price must be positive',
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
      return
    }

    setLoading(true)

    try {
      // Map TheGamesDB structure to our database structure
      const newGame = {
        title: selectedGame.game_title || selectedGame.title,
        description: selectedGame.overview || selectedGame.description || '',
        genre: Array.isArray(selectedGame.genre) ? selectedGame.genre.join(', ') : (selectedGame.genre || ''),
        rating: selectedGame.rating ? parseFloat(selectedGame.rating) : 0,
        image_url: selectedGame.box_art || selectedGame.image_url || 'https://via.placeholder.com/300x400',
        stock: parseInt(stock),
        price: parseFloat(price),
        is_published: true
      }

      await db.createGame(newGame)
      Swal.fire({
        icon: 'success',
        title: 'Game Published!',
        text: `${newGame.title} has been added to the store`,
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
      setStock(10)
      setPrice(49.99)
      onPublished()
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error Publishing Game',
        text: error.message,
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
    } finally {
      setLoading(false)
    }
  }

  if (!selectedGame) {
    return (
      <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border rounded-lg p-6 text-center`}>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Select a game from the search results to configure stock and price</p>
      </div>
    )
  }

  return (
    <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border rounded-lg p-6`}>
      <h2 className="text-2xl font-bold mb-4">Game Configuration</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Game Info */}
        <div className="flex gap-4">
          {selectedGame.box_art && (
            <img src={selectedGame.box_art} alt={selectedGame.game_title} className="w-24 h-32 object-cover rounded" />
          )}
          <div>
            <h3 className="font-semibold text-lg">{selectedGame.game_title}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedGame.genre}</p>
            {selectedGame.rating && <p className="text-yellow-400 text-sm">⭐ {selectedGame.rating}</p>}
            <p className={`text-sm mt-2 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedGame.overview || selectedGame.description}
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Stock</label>
            <input
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className={`w-full px-4 py-2 rounded border-2 ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} focus:outline-none focus:border-blue-500`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Price ($)</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full px-4 py-2 rounded border-2 ${isDark ? 'bg-slate-700 border-slate-600' : 'bg-white border-slate-200'} focus:outline-none focus:border-blue-500`}
            />
          </div>

          <button
            onClick={handlePublish}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            {loading ? 'Publishing...' : 'Publish Game'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default GamePublish
