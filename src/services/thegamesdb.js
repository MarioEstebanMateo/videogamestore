const API_KEY = import.meta.env.VITE_GAMES_DB_API_KEY;

export const searchGamesTheGamesDB = async (gameName) => {
  try {
    const response = await fetch(
      `/api/Games/ByGameName?name=${encodeURIComponent(gameName)}&apikey=${API_KEY}`,
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Games Response:", data);

    // Convert games object to array
    const gamesObj = data.data.games || {};
    const gamesArray = Object.values(gamesObj);

    return gamesArray;
  } catch (error) {
    console.error("Error searching games:", error);
    throw error;
  }
};
