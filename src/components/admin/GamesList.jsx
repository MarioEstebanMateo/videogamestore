import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useTheme } from '../../hooks/useTheme'
import { Trash2 } from 'lucide-react'
import * as db from '../../services/db'

const GamesList = ({ refreshTrigger }) => {
  const { isDark } = useTheme()
  const [unpublishedGames, setUnpublishedGames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGames()
  }, [refreshTrigger])

  const loadGames = async () => {
    try {
      setLoading(true)
      const allGames = await db.getAllGames(false)
      const unpublished = allGames.filter(g => !g.is_published)
      setUnpublishedGames(unpublished)
    } catch (error) {
      console.error('Error loading games:', error)
    } finally {
      setLoading(false)
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
        setUnpublishedGames(unpublishedGames.filter(g => g.id !== gameId))
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

  return (
    <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border rounded-lg p-6`}>
      <h2 className="text-2xl font-bold mb-4">Unpublished Games ({unpublishedGames.length})</h2>

      {loading ? (
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Loading...</p>
      ) : unpublishedGames.length === 0 ? (
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>No unpublished games</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {unpublishedGames.map(game => (
            <div
              key={game.id}
              className={`flex items-center justify-between p-3 rounded ${isDark ? 'bg-slate-700' : 'bg-white'} border ${isDark ? 'border-slate-600' : 'border-slate-200'}`}
            >
              <div className="flex-1">
                <h3 className="font-semibold">{game.title}</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Stock: {game.stock} | ${game.price.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => handleDeleteGame(game.id, game.title)}
                className={`p-2 rounded transition-colors ${isDark ? 'hover:bg-slate-600' : 'hover:bg-slate-100'} text-red-500`}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default GamesList
