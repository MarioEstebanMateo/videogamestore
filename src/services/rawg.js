const API_KEY = import.meta.env.VITE_RAWG_API_KEY || "";
const BASE_URL = "https://api.rawg.io/api";

export const searchGamesRAWG = async (gameName) => {
  try {
    // RAWG API requires an API key - get free key from https://rawg.io/apidocs
    if (!API_KEY || API_KEY === "YOUR_RAWG_API_KEY") {
      throw new Error(
        "RAWG API key is required. Get a free key at https://rawg.io/apidocs and add VITE_RAWG_API_KEY to your .env file",
      );
    }

    let url = `${BASE_URL}/games?search=${encodeURIComponent(gameName)}&page_size=10&key=${API_KEY}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    const games = data.results || [];

    if (games.length === 0) {
      throw new Error("No games found");
    }

    // Process and return games with all needed data
    const processedGames = games.map((game) => ({
      id: game.id,
      game_title: game.name,
      title: game.name,
      description: game.description || "",
      overview: game.description || "",
      image_url: game.background_image,
      box_art: game.background_image,
      rating: game.rating ? Math.round(game.rating * 10) / 10 : 0,
      genres: game.genres ? game.genres.map((g) => g.name) : [],
      genre: game.genres ? game.genres.map((g) => g.name).join(", ") : "",
      platforms: game.platforms
        ? game.platforms.map((p) => p.platform.name)
        : [],
      release_date: game.released || "",
      developers: game.developers ? game.developers.map((d) => d.name) : [],
      publishers: game.publishers ? game.publishers.map((p) => p.name) : [],
      players: game.esrb_rating ? game.esrb_rating.name : "N/A",
      coop: game.tags
        ? game.tags.some((t) => t.name.toLowerCase().includes("coop"))
        : false,
      stock: 20, // Default stock for new games
      price: 59.99, // Default price
    }));

    return processedGames;
  } catch (error) {
    console.error("Error searching RAWG games:", error);
    throw error;
  }
};

export const getGameDetailsRAWG = async (gameId) => {
  try {
    // RAWG API requires an API key - get free key from https://rawg.io/apidocs
    if (!API_KEY || API_KEY === "YOUR_RAWG_API_KEY") {
      throw new Error(
        "RAWG API key is required. Get a free key at https://rawg.io/apidocs and add VITE_RAWG_API_KEY to your .env file",
      );
    }

    const url = `${BASE_URL}/games/${gameId}?key=${API_KEY}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const game = await response.json();

    return {
      id: game.id,
      game_title: game.name,
      title: game.name,
      description: game.description || "",
      overview: game.description_raw || "",
      image_url: game.background_image,
      box_art: game.background_image,
      rating: game.rating ? Math.round(game.rating * 10) / 10 : 0,
      genres: game.genres ? game.genres.map((g) => g.name) : [],
      genre: game.genres ? game.genres.map((g) => g.name).join(", ") : "",
      platforms: game.platforms
        ? game.platforms.map((p) => p.platform.name)
        : [],
      release_date: game.released || "",
      developers: game.developers ? game.developers.map((d) => d.name) : [],
      publishers: game.publishers ? game.publishers.map((p) => p.name) : [],
      players: game.esrb_rating ? game.esrb_rating.name : "N/A",
      coop: game.tags
        ? game.tags.some((t) => t.name.toLowerCase().includes("coop"))
        : false,
      stock: 20,
      price: 59.99,
    };
  } catch (error) {
    console.error("Error fetching RAWG game details:", error);
    return null;
  }
};
