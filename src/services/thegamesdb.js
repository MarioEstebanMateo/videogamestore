const API_KEY = import.meta.env.VITE_GAMES_DB_API_KEY;

export const searchGamesTheGamesDB = async (gameName) => {
  try {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      throw new Error(
        "TheGamesDB API key not configured. Please add VITE_GAMES_DB_API_KEY to .env.local",
      );
    }

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
      throw new Error("No games found");
    }

    // Get details for each game
    const gamesWithDetails = await Promise.all(
      gamesArray.map((game) => getGameDetails(game.id)),
    );

    return gamesWithDetails.filter((game) => game !== null);
  } catch (error) {
    console.error("Error searching games:", error);
    throw error;
  }
};

export const getGameDetails = async (gameId) => {
  try {
    const response = await fetch(
      `/api/Games/ByGameID?id=${gameId}&fields=id,game_title,overview,release_date,rating,genres,images,developers,publishers,platforms,players,co-op&apikey=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Game Details for ID " + gameId + ":", data);

    const game = data.data?.games?.[0];
    if (!game) return null;

    // Fetch images separately
    let imageUrl = null;
    try {
      const imagesResponse = await fetch(
        `/api/Games/Images?games_id=${gameId}&apikey=${API_KEY}`,
      );
      if (imagesResponse.ok) {
        const imagesData = await imagesResponse.json();
        console.log("Images data for ID " + gameId + ":", imagesData);

        const baseUrl =
          imagesData.data?.base_url?.thumb ||
          "https://cdn.thegamesdb.net/images/thumb/";
        const gameImages = imagesData.data?.images?.[gameId] || [];

        if (gameImages.length > 0) {
          const coverImage = gameImages.find(
            (img) => img.type === "boxart" && img.side === "front",
          );
          if (coverImage) {
            imageUrl = baseUrl + coverImage.filename;
            console.log("Image URL:", imageUrl);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }

    // Extract genres
    let genres = [];
    if (game.genres && Array.isArray(game.genres)) {
      genres = game.genres
        .map((g) => {
          if (typeof g === "object" && g.genre_name) {
            return g.genre_name;
          }
          return g;
        })
        .filter((g) => g);
    }

    // Extract developers
    let developers = [];
    if (game.developers && Array.isArray(game.developers)) {
      developers = game.developers
        .map((d) => {
          if (typeof d === "object" && d.name) {
            return d.name;
          }
          return d;
        })
        .filter((d) => d);
    }

    // Extract publishers
    let publishers = [];
    if (game.publishers && Array.isArray(game.publishers)) {
      publishers = game.publishers
        .map((p) => {
          if (typeof p === "object" && p.name) {
            return p.name;
          }
          return p;
        })
        .filter((p) => p);
    }

    // Extract platforms
    let platforms = [];
    if (game.platforms && Array.isArray(game.platforms)) {
      platforms = game.platforms
        .map((p) => {
          if (typeof p === "object" && p.platform_name) {
            return p.platform_name;
          }
          return p;
        })
        .filter((p) => p);
    }

    // Extract rating
    let rating = 0;
    if (game.rating) {
      rating = parseFloat(game.rating);
    }

    // Extract players info
    let players = null;
    if (game.players && game.players.length > 0) {
      const playerInfo =
        typeof game.players[0] === "object" ? game.players[0] : null;
      if (playerInfo) {
        players = playerInfo;
      } else {
        players = game.players[0];
      }
    }

    // Extract co-op info
    let coop = false;
    if (game["co-op"]) {
      coop =
        game["co-op"] === "Yes" ||
        game["co-op"] === true ||
        game["co-op"] === 1;
    }

    const result = {
      id: game.id,
      game_title: game.game_title || "Unknown Game",
      title: game.game_title || "Unknown Game",
      overview: game.overview || "",
      description: game.overview || "",
      release_date: game.release_date || "",
      rating: rating,
      genres: genres,
      genre: genres.join(", ") || "Unknown",
      developers: developers,
      publishers: publishers,
      platforms: platforms,
      players: players,
      coop: coop,
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
