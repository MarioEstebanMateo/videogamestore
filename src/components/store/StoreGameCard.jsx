import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useCart } from '../../hooks/useCart'
import { ShoppingCart } from 'lucide-react'

const StoreGameCard = ({ game }) => {
  const { isDark } = useTheme()
  const { addToCart } = useCart()
  const [added, setAdded] = React.useState(false)

  const handleAddToCart = async () => {
    try {
      await addToCart(game)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error('Error adding to cart:', error)
    }
  }

  return (
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

        <div className="space-y-1 mb-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="bg-blue-500 px-2 py-1 rounded">{game.genre}</span>
            <span className="text-yellow-400 font-semibold">⭐ {game.rating}</span>
          </div>
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

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-emerald-500">${game.price.toFixed(2)}</span>
            <div className={`text-xs mt-1 ${game.stock > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {game.stock > 0 ? `${game.stock} in stock` : 'Out of stock'}
            </div>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={game.stock === 0}
          className={`w-full py-2 rounded font-medium flex items-center justify-center gap-2 transition-colors ${added ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 flex-shrink-0`}
        >
          <ShoppingCart size={18} />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default StoreGameCard
