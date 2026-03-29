import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useTheme } from '../../hooks/useTheme'
import { Trash2, Edit2, Save, X } from 'lucide-react'
import * as db from '../../services/db'

const PublishedGamesList = ({ refreshTrigger }) => {
  const { isDark } = useTheme()
  const [publishedGames, setPublishedGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  useEffect(() => {
    loadPublishedGames()
  }, [refreshTrigger])

  const loadPublishedGames = async () => {
    try {
      setLoading(true)
      const allGames = await db.getAllGames(true)
      setPublishedGames(allGames)
    } catch (error) {
      console.error('Error loading games:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartEdit = (game) => {
    setEditingId(game.id)
    setEditData({
      stock: game.stock,
      price: game.price,
      title: game.title,
      description: game.description,
    })
  }

  const handleSaveEdit = async (gameId) => {
    try {
      await db.updateGame(gameId, editData)
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Game has been updated successfully',
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
      setEditingId(null)
      setEditData({})
      loadPublishedGames()
    } catch (error) {
      console.error('Error updating game:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to update the game',
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
    }
  }

  const handleDeleteGame = async (gameId, gameName) => {
    const result = await Swal.fire({
      icon: 'warning',
      title: 'Delete Game?',
      text: `Are you sure you want to delete "${gameName}"? This action cannot be undone.`,
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      background: isDark ? '#1e293b' : '#ffffff',
      color: isDark ? '#f1f5f9' : '#000000',
    })

    if (result.isConfirmed) {
      try {
        await db.deleteGame(gameId)
        setPublishedGames(publishedGames.filter(g => g.id !== gameId))
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: `${gameName} has been deleted successfully`,
          background: isDark ? '#1e293b' : '#ffffff',
          color: isDark ? '#f1f5f9' : '#000000',
        })
      } catch (error) {
        console.error('Error deleting game:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete the game',
          background: isDark ? '#1e293b' : '#ffffff',
          color: isDark ? '#f1f5f9' : '#000000',
        })
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
  }

  return (
    <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border rounded-lg p-6`}>
      <h2 className="text-2xl font-bold mb-4">Published Games ({publishedGames.length})</h2>

      {loading ? (
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading...</p>
      ) : publishedGames.length === 0 ? (
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No published games yet</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {publishedGames.map(game => (
            <div
              key={game.id}
              className={`p-4 rounded ${isDark ? 'bg-slate-700' : 'bg-white'} border ${isDark ? 'border-slate-600' : 'border-slate-200'}`}
            >
              {editingId === game.id ? (
                // Edit Mode
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1">Title</label>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                      className={`w-full px-3 py-2 rounded text-sm border ${isDark ? 'bg-slate-600 border-slate-500' : 'bg-white border-slate-300'} focus:outline-none`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Stock</label>
                      <input
                        type="number"
                        min="0"
                        value={editData.stock}
                        onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })}
                        className={`w-full px-3 py-2 rounded text-sm border ${isDark ? 'bg-slate-600 border-slate-500' : 'bg-white border-slate-300'} focus:outline-none`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Price ($)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editData.price}
                        onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
                        className={`w-full px-3 py-2 rounded text-sm border ${isDark ? 'bg-slate-600 border-slate-500' : 'bg-white border-slate-300'} focus:outline-none`}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(game.id)}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm flex items-center justify-center gap-1 transition-colors"
                    >
                      <Save size={16} />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm flex items-center justify-center gap-1 transition-colors"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="flex gap-4 items-start">
                  {game.image_url ? (
                    <img 
                      src={game.image_url} 
                      alt={game.title} 
                      className="w-16 h-20 object-cover rounded flex-shrink-0" 
                      onError={(e) => {e.target.style.display = 'none'}}
                    />
                  ) : (
                    <div className="w-16 h-20 bg-gray-300 dark:bg-gray-600 rounded flex-shrink-0 flex items-center justify-center text-xs">No img</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{game.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Stock: {game.stock} | Price: ${game.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleStartEdit(game)}
                      className={`p-2 rounded transition-colors ${isDark ? 'hover:bg-slate-600' : 'hover:bg-slate-100'} text-blue-500`}
                      title="Edit"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteGame(game.id, game.title)}
                      className={`p-2 rounded transition-colors ${isDark ? 'hover:bg-slate-600' : 'hover:bg-slate-100'} text-red-500`}
                      title="Delete"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PublishedGamesList
