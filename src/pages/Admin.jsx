import React from 'react'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import GameSearch from '../components/admin/GameSearch'
import GamePublish from '../components/admin/GamePublish'
import GamesList from '../components/admin/GamesList'

const Admin = () => {
  const { user } = useAuth()
  const { isDark } = useTheme()
  const [selectedGame, setSelectedGame] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  if (!user) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'} flex items-center justify-center`}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Please log in to access admin panel</p>
        </div>
      </div>
    )
  }

  const handleGameSelected = (game) => {
    setSelectedGame(game)
  }

  const handleGamePublished = () => {
    setSelectedGame(null)
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Manage your video game store inventory</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GameSearch onSelectGame={handleGameSelected} />
            <GamePublish selectedGame={selectedGame} onPublished={handleGamePublished} />
          </div>

          <div>
            <GamesList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin
