import React from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import { useAuth } from '../hooks/useAuth'
import { useCart } from '../hooks/useCart'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import CartDrawer from '../components/cart/CartDrawer'
import LoginModal from '../components/auth/LoginModal'
import SignupModal from '../components/auth/SignupModal'
import * as db from '../services/db'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

const Checkout = () => {
  const { isDark } = useTheme()
  const { user, logout } = useAuth()
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [cartOpen, setCartOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)
  const [processing, setProcessing] = useState(false)

  const handleCompleteOrder = async () => {
    if (!user) {
      setLoginOpen(true)
      return
    }

    if (items.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Empty Cart',
        text: 'Your cart is empty. Add items before checking out.',
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
      return
    }

    setProcessing(true)

    try {
      // Reduce stock for purchased items
      await db.checkout(items)
      // Clear cart
      await clearCart()
      // Navigate to thank you page
      navigate('/thank-you')
    } catch (error) {
      console.error('Error completing order:', error)
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: 'Error completing your order. Please try again.',
        background: isDark ? '#1e293b' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#000000',
      })
    } finally {
      setProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className={`min-h-screen flex flex-col ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
        <Header 
          onLoginClick={() => setLoginOpen(true)} 
          onSignupClick={() => setSignupOpen(true)}
          onCartClick={() => setCartOpen(true)}
        />
        
        <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full flex flex-col items-center justify-center">
          <p className="text-xl mb-6">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Shopping
          </button>
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

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'}`}>
      <Header 
        onLoginClick={() => setLoginOpen(true)} 
        onSignupClick={() => setSignupOpen(true)}
        onCartClick={() => setCartOpen(true)}
      />

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Shopping
        </button>

        <h1 className="text-4xl font-bold mb-8">Order Summary</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Items */}
          <div className="md:col-span-2">
            <div className={`${isDark ? 'bg-slate-800' : 'bg-slate-100'} rounded-lg p-6`}>
              {items.map(item => (
                <div key={item.id} className={`flex gap-4 py-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'} last:border-b-0`}>
                  <img src={item.image_url} alt={item.title} className="w-24 h-32 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Qty: {item.quantity}</p>
                    <p className="text-blue-500 font-semibold mt-2">${item.price.toFixed(2)} each</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-emerald-500">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'} border rounded-lg p-6 h-fit`}>
            <h2 className="text-2xl font-bold mb-6">Order Total</h2>

            <div className={`space-y-4 py-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-beteween">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>

            <div className="py-4 flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span className="text-emerald-500">${total.toFixed(2)}</span>
            </div>

            {user ? (
              <>
                <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Logged in as: <strong>{user.username}</strong>
                </p>
                <button
                  onClick={handleCompleteOrder}
                  disabled={processing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? 'Processing...' : 'Complete Order'}
                </button>
              </>
            ) : (
              <>
                <p className={`text-sm mb-4 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  Please log in to proceed
                </p>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Login to Continue
                </button>
              </>
            )}
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

export default Checkout
