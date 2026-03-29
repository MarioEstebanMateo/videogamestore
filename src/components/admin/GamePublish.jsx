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
      // Map game structure from RAWG to our database structure
      let imageUrl = null;
      
      console.log("Selected game data:", selectedGame);
      
      // Use image URL from processed game data
      if (selectedGame.image_url) {
        imageUrl = selectedGame.image_url;
      } else if (selectedGame.box_art) {
        imageUrl = selectedGame.box_art;
      }
      
      const newGame = {
        id: selectedGame.slug || selectedGame.id || `game-${Date.now()}`,
        title: selectedGame.game_title || selectedGame.title,
        description: selectedGame.overview || selectedGame.description || '',
        genres: Array.isArray(selectedGame.genres) ? selectedGame.genres.join(', ') : (selectedGame.genre || selectedGame.genres || ''),
        rating: selectedGame.rating ? parseFloat(selectedGame.rating) : 0,
        developer: (Array.isArray(selectedGame.developers) ? selectedGame.developers[0] : selectedGame.developer) || '',
        publisher: (Array.isArray(selectedGame.publishers) ? selectedGame.publishers[0] : selectedGame.publisher) || '',
        platforms: selectedGame.platforms ? selectedGame.platforms.join(', ') : '',
        release_date: selectedGame.release_date || '',
        image_url: imageUrl,
        screenshot_url: imageUrl,
        stock: parseInt(stock),
        price: parseFloat(price),
        is_published: true
      }
      
      console.log("Game to publish:", newGame);

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
          {(() => {
            let imageUrl = null;
            if (selectedGame.box_art?.thumb) {
              imageUrl = selectedGame.box_art.thumb;
            } else if (selectedGame.box_art) {
              imageUrl = selectedGame.box_art;
            } else if (selectedGame.images && selectedGame.images.length > 0) {
              imageUrl = selectedGame.images[0].thumb || selectedGame.images[0];
            }
            return imageUrl ? (
              <img src={imageUrl} alt={selectedGame.game_title} className="w-24 h-32 object-cover rounded" onError={(e) => {e.target.style.display = 'none'}} />
            ) : (
              <div className="w-24 h-32 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-sm">No image</div>
            );
          })()}
          <div>
            <h3 className="font-semibold text-lg">{selectedGame.game_title}</h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{selectedGame.genre || 'N/A'}</p>
            {selectedGame.rating && <p className="text-yellow-400 text-sm">⭐ {selectedGame.rating}</p>}
            {selectedGame.platforms && selectedGame.platforms.length > 0 && (
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                <strong>Platforms:</strong> {selectedGame.platforms.join(', ')}
              </p>
            )}
            {selectedGame.developers && selectedGame.developers.length > 0 && (
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <strong>Dev:</strong> {selectedGame.developers.join(', ')}
              </p>
            )}
            {selectedGame.publishers && selectedGame.publishers.length > 0 && (
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <strong>Pub:</strong> {selectedGame.publishers.join(', ')}
              </p>
            )}
            {selectedGame.release_date && (
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <strong>Released:</strong> {selectedGame.release_date}
              </p>
            )}
            {selectedGame.coop && (
              <p className={`text-xs text-green-500 font-semibold`}>✓ Co-op Available</p>
            )}
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
