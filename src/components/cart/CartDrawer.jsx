import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'
import { X, Trash2 } from 'lucide-react'

const CartItem = ({ item }) => {
  const { isDark } = useTheme()
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className={`flex gap-4 py-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
      <img src={item.image_url} alt={item.title} className="w-20 h-24 object-cover rounded" />
      <div className="flex-1">
        <h3 className="font-semibold line-clamp-1">{item.title}</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>${item.price.toFixed(2)}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className={`px-2 py-1 rounded text-sm ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'}`}
          >
            -
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className={`px-2 py-1 rounded text-sm ${isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'}`}
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => removeFromCart(item.id)}
          className={`p-1 rounded mt-2 ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-200'} text-red-500`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}

const CartDrawer = ({ isOpen, onClose }) => {
  const { isDark } = useTheme()
  const { items, total, clearCart } = useCart()
  const { user } = useAuth()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full md:w-96 ${isDark ? 'bg-slate-900' : 'bg-white'} shadow-lg z-50 flex flex-col`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <button onClick={onClose} className={`p-1 rounded ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}>
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <p className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Your cart is empty
            </p>
          ) : (
            items.map(item => <CartItem key={item.id} item={item} />)
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className={`border-t p-6 space-y-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex justify-between text-xl font-bold">
              <span>Total:</span>
              <span className="text-emerald-500">${total.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium text-center transition-colors block"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => clearCart()}
              className={`w-full py-2 rounded font-medium transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'}`}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default CartDrawer
