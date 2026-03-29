import React, { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import StoreGameCard from '../components/store/StoreGameCard'
import CartDrawer from '../components/cart/CartDrawer'
import LoginModal from '../components/auth/LoginModal'
import SignupModal from '../components/auth/SignupModal'
import * as db from '../services/db'

const Home = () => {
  const { isDark } = useTheme()
  const { user } = useAuth()
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadGames()
  }, [])

  const loadGames = async () => {
    try {
      setLoading(true)
      const allGames = await db.getAllGames(true)
      setGames(allGames)
    } catch (error) {
      console.error('Error loading games:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.genre.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Header 
        onLoginClick={() => setLoginOpen(true)} 
        onSignupClick={() => setSignupOpen(true)}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            Video Games Store
          </h1>
          <p className={`text-xl mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Discover and purchase the best games from around the world
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <input
              type="text"
              placeholder="Search games by title or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-6 py-3 rounded-lg border-2 ${isDark ? 'bg-slate-800 border-slate-700 focus:border-blue-500' : 'bg-white border-slate-200 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all`}
            />
          </div>
        </div>

        {/* Games Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading games...</p>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm ? 'No games found matching your search.' : 'No games available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              <div key={game.id}>
                {user ? (
                  <StoreGameCard game={game} />
                ) : (
                  <div onClick={() => setLoginOpen(true)} className="cursor-pointer">
                    <StoreGameCard game={game} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Auth Modals */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToSignup={() => {
          setLoginOpen(false)
          setSignupOpen(true)
        }}
      />
      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        onSwitchToLogin={() => {
          setSignupOpen(false)
          setLoginOpen(true)
        }}
      />
    </div>
  )
}

export default Home
