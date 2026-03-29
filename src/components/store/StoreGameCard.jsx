import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { ShoppingCart } from 'lucide-react'
import { getNeonColorStyle } from '../../utils/neonColors'
import './neon.css'

const StoreGameCard = ({ game }) => {
  const { isDark } = useTheme()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [added, setAdded] = React.useState(false)
  const [error, setError] = React.useState('')

  const handleAddToCart = async () => {
    if (!user) {
      setError('You must log in to add to cart')
      setTimeout(() => setError(''), 3000)
      return
    }
    try {
      setError('')
      await addToCart(game)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (err) {
      setError(err.message)
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="game-card-neon h-full" style={getNeonColorStyle(game.id || game.title)}>
      <div className={`${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col`}>
      {/* Image */}
      <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden flex-shrink-0">
        {game.image_url ? (
          <img src={game.image_url} alt={game.title} className="w-full h-full object-cover" onError={(e) => {e.target.style.display = 'none'}} />
        ) : (
          <div className="text-gray-600 text-sm text-center px-4">No image available</div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 h-14 flex items-start">{game.title}</h3>
        
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-2 line-clamp-2 flex-1`}>
          {game.description}
        </p>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-blue-500 px-2 py-1 rounded text-xs">{game.genre}</span>
            <span className="text-yellow-400 font-semibold text-sm">⭐ {game.rating}/5</span>
          </div>
          {/* Rating Progress Bar */}
          <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                game.rating >= 4
                  ? 'bg-gradient-to-r from-green-400 to-green-500'
                  : game.rating >= 3
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500'
                  : 'bg-gradient-to-r from-red-400 to-red-500'
              }`}
              style={{ width: `${(game.rating / 5) * 100}%` }}
            />
          </div>
          <div className="space-y-1 text-xs">
            {game.developers && (
              <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <strong>Dev:</strong> {game.developers}
              </p>
            )}
            {game.platforms && (
              <p className={`${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <strong>Platform:</strong> {game.platforms}
              </p>
            )}
            {game.coop && (
              <p className="text-green-500 font-semibold">✓ Co-op Available</p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-emerald-500">${game.price.toFixed(2)}</span>
            <div className={`text-xs mt-1 ${game.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {game.stock > 0 ? `${game.stock} in stock` : 'Out of stock'}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-2 rounded mb-2 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleAddToCart}
          disabled={game.stock === 0 || !user}
          className={`w-full py-2 rounded font-medium flex items-center justify-center gap-2 transition-colors ${added ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 flex-shrink-0`}
        >
          <ShoppingCart size={18} />
          {added ? 'Added!' : !user ? 'Log in' : 'Add to Cart'}
        </button>
      </div>
      </div>
    </div>
  )
}

export default StoreGameCard
