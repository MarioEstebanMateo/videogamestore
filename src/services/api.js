const API_KEY = import.meta.env.VITE_GAMES_DB_API_KEY;

export const getPlatforms = async () => {
  try {
    const response = await fetch(`/api/Platforms?apikey=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    // Convert platforms object to array
    const platformsObj = data.data.platforms || {};
    const platformsArray = Object.values(platformsObj);

    return platformsArray;
  } catch (error) {
    console.error("Error fetching platforms:", error);
    throw error;
  }
};

export const searchGames = async (gameName) => {
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
