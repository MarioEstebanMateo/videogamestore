import React from 'react'

const GameCard = ({ game }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-slate-700">
      <div className="flex gap-4">
        {game.box_art ? (
          <img src={game.box_art} alt={game.game_title} className="w-24 h-32 object-cover rounded" />
        ) : (
          <div className="w-24 h-32 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center text-sm text-center">
            No image
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{game.game_title}</h3>
          {game.overview && (
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">
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
          <div className="flex justify-between items-center">
            {game.release_date && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Release: {game.release_date}
              </p>
            )}
            {game.rating && game.rating !== 'Not Rated' && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="text-sm font-medium">{game.rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameCard
