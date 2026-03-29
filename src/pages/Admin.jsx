import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useTheme } from '../hooks/useTheme'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import GameSearch from '../components/admin/GameSearch'
import GamePublish from '../components/admin/GamePublish'
import GamesList from '../components/admin/GamesList'
import CartDrawer from '../components/cart/CartDrawer'
import LoginModal from '../components/auth/LoginModal'
import SignupModal from '../components/auth/SignupModal'

const Admin = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isDark } = useTheme()
  const [selectedGame, setSelectedGame] = useState(null)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

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
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Header 
        onLoginClick={() => setLoginOpen(true)} 
        onSignupClick={() => setSignupOpen(true)}
        onCartClick={() => setCartOpen(true)}
      />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Manage your video game store inventory</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Home
            </button>
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
      </main>

      <Footer />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
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

export default Admin
