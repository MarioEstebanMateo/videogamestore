import React from 'react'
import { getNeonColorStyle } from '../utils/neonColors'
import './GameCard.css'

const GameCard = ({ game }) => {
  return (
    <div className="game-card-neon h-full" style={getNeonColorStyle(game.id || game.game_title)}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-slate-700 transition-all duration-300 h-full flex flex-col">
        <div className="flex gap-4">
          {game.box_art ? (
            <img src={game.box_art} alt={game.game_title} className="w-24 h-32 object-cover rounded" />
          ) : (
            <div className="w-24 h-32 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-sm text-center">
              No image
            </div>
          )}
          <div className="flex-1 flex flex-col">
            <h3 className="font-semibold text-lg mb-2">{game.game_title}</h3>
            {game.overview && (
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-3 flex-1">
                {game.overview.length > 200 ? game.overview.substring(0, 200) + '...' : game.overview}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-2">
              {game.genres && game.genres.length > 0 && (
                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                  {Array.isArray(game.genres) ? game.genres.join(', ') : game.genres}
                </span>
              )}
              {game.platforms && game.platforms.length > 0 && (
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
                  Platforms: {Array.isArray(game.platforms) ? game.platforms.join(', ') : game.platforms}
                </span>
              )}
            </div>
            <div className="flex justify-between items-start gap-4 mt-auto">
              <div className="flex-1">
                {game.release_date && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Release: {game.release_date}
                  </p>
                )}
                {game.rating && game.rating !== 'Not Rated' && (
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm font-medium">{game.rating}/5</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard
