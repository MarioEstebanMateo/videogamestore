const API_KEY = import.meta.env.VITE_GAMES_DB_API_KEY;

export const searchGamesTheGamesDB = async (gameName) => {
  try {
    // First search to get game IDs
    const response = await fetch(
      `/api/Games/ByGameName?name=${encodeURIComponent(gameName)}&apikey=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Games Response:", data);

    // Convert games object to array
    const gamesObj = data.data?.games || {};
    const gamesArray = Object.values(gamesObj).slice(0, 10); // Limit to 10 results

    if (gamesArray.length === 0) {
      throw new Error('No games found');
    }

    // Get details for each game
    const gamesWithDetails = await Promise.all(
      gamesArray.map(game => getGameDetails(game.id))
    );

    return gamesWithDetails.filter(game => game !== null);
  } catch (error) {
    console.error("Error searching games:", error);
    throw error;
  }
};

export const getGameDetails = async (gameId) => {
  try {
    const response = await fetch(
      `/api/Games?id=${gameId}&fields=id,game_title,overview,release_date,rating,genres,images&apikey=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Game Details for ID " + gameId + ":", data);

    const game = data.data?.games?.[gameId];
    if (!game) return null;

    // Extract image URL - try multiple approaches
    let imageUrl = null;
    
    // Approach 1: Check if images array exists
    if (game.images && Array.isArray(game.images) && game.images.length > 0) {
      console.log("Images found:", game.images);
      // Look for cover/boxart image first
      const coverImage = game.images.find(img => 
        img.type === 'cover' || img.type === 'fanart' || img.type === 'banner' || img.type === 'screenshot'
      );
      
      if (coverImage) {
        imageUrl = `https://cdn.thegamesdb.net/images/${coverImage.filename}`;
      } else if (game.images[0].filename) {
        imageUrl = `https://cdn.thegamesdb.net/images/${game.images[0].filename}`;
      }
    }
    
    // Approach 2: Check for poster or thumbnail
    if (!imageUrl && game.poster) {
      imageUrl = `https://cdn.thegamesdb.net/images/${game.poster}`;
    }

    // Fallback: use a placeholder with game name
    if (!imageUrl) {
      imageUrl = `https://via.placeholder.com/300x400?text=${encodeURIComponent(game.game_title)}`;
    }

    // Extract genres
    let genres = [];
    if (game.genres && Array.isArray(game.genres)) {
      genres = game.genres.map(g => {
        if (typeof g === 'object' && g.genre_name) {
          return g.genre_name;
        }
        return g;
      }).filter(g => g);
    }

    // Extract rating
    let rating = 0;
    if (game.rating) {
      rating = parseFloat(game.rating);
    }

    const result = {
      id: game.id,
      game_title: game.game_title || 'Unknown Game',
      title: game.game_title || 'Unknown Game',
      overview: game.overview || '',
      description: game.overview || '',
      release_date: game.release_date || '',
      rating: rating,
      genres: genres,
      genre: genres.join(', ') || 'Unknown',
      image_url: imageUrl,
      box_art: imageUrl,
      images: game.images || [],
    };

    console.log("Processed game:", result);
    return result;
  } catch (error) {
    console.error("Error fetching game details for ID " + gameId + ":", error);
    return null;
  }
};
