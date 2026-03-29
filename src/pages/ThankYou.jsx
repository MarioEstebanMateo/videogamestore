import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import CartDrawer from '../components/cart/CartDrawer'
import LoginModal from '../components/auth/LoginModal'
import SignupModal from '../components/auth/SignupModal'
import { CheckCircle } from 'lucide-react'
import { useState } from 'react'

const ThankYou = () => {
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Header 
        onLoginClick={() => setLoginOpen(true)} 
        onSignupClick={() => setSignupOpen(true)}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <CheckCircle size={80} className="text-green-500" />
          </div>

          <h1 className="text-5xl font-bold mb-4">Thank You!</h1>
          <p className={`text-xl mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Your order has been completed successfully
          </p>
          <p className={`text-lg mb-8 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            We've received your order and will process it right away.
          </p>

          <div className={`${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-lg p-8 mb-8 text-left inline-block`}>
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <ul className={`space-y-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>✓ Order confirmation has been sent to your email</li>
              <li>✓ You can download your games immediately</li>
              <li>✓ Track your order in your account</li>
              <li>✓ Contact support if you have any issues</li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors"
          >
            Continue Shopping
          </button>
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

export default ThankYou
