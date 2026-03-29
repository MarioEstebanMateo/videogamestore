import React, { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'
import { ArrowUpDown } from 'lucide-react'
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
  const [sortBy, setSortBy] = useState('release-date') // latest, price-low, price-high, rating, alphabetical, release-date

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

  const refreshGames = () => loadGames()

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.genres.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'alphabetical':
        return a.title.localeCompare(b.title)
      case 'release-date':
        return new Date(b.release_date) - new Date(a.release_date)
      case 'latest':
      default:
        return new Date(b.created_at) - new Date(a.created_at)
    }
  })

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
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search games by title or genre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-6 py-3 rounded-lg border-2 ${isDark ? 'bg-slate-800 border-slate-700 focus:border-blue-500' : 'bg-white border-slate-200 focus:border-blue-500'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all`}
            />
          </div>

          {/* Sort Controls */}
          <div className="max-w-2xl mx-auto mb-8 flex gap-3 items-center justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <ArrowUpDown size={18} />
              <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded border-2 ${isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'} focus:outline-none focus:border-blue-500 transition-colors`}
            >
              <option value="latest">Latest Added</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="release-date">Release Date (Newest)</option>
            </select>
          </div>
        </div>

        {/* Games Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Loading games...</p>
          </div>
        ) : sortedGames.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm ? 'No games found matching your search.' : 'No games available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
            {sortedGames.map(game => (
              <div key={game.id} className="h-full">
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
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} onCheckoutSuccess={refreshGames} />

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
