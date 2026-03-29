import React from 'react'

const GameCard = ({ game }) => {
  return (
    <div>
      {game.box_art && <img src={game.box_art} alt={game.game_title} />}
      <h3>{game.game_title}</h3>
      {game.overview && <p>{game.overview}</p>}
      {game.genres && <p>Géneros: {game.genres.join(', ')}</p>}
      {game.rating && <p>Valoración: {game.rating}</p>}
    </div>
  )
}

export default GameCard
