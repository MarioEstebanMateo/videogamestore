// Debug script to check TheGamesDB API response
// Run this in browser console to test

const API_KEY = "YOUR_API_KEY"; // Replace with your API key

async function testSearch(gameName) {
  try {
    console.log(`Searching for "${gameName}"...`);

    const response = await fetch(
      `/api/Games/ByGameName?name=${encodeURIComponent(gameName)}&apikey=${API_KEY}`,
    );

    const data = await response.json();
    console.log("Search Response:", data);

    const gamesObj = data.data?.games || {};
    const gamesArray = Object.values(gamesObj);

    if (gamesArray.length > 0) {
      console.log(`Found ${gamesArray.length} games`);
      console.log("First game:", gamesArray[0]);

      // Get details for first game
      const gameId = gamesArray[0].id;
      await testGetDetails(gameId);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

async function testGetDetails(gameId) {
  try {
    console.log(`\nGetting details for game ID ${gameId}...`);

    const response = await fetch(
      `/api/Games?id=${gameId}&fields=id,game_title,overview,release_date,rating,genres,images&apikey=${API_KEY}`,
    );

    const data = await response.json();
    console.log("Details Response:", data);

    const game = data.data?.games?.[gameId];
    if (game) {
      console.log("Game Title:", game.game_title);
      console.log("Description:", game.overview);
      console.log("Images:", game.images);
      console.log("Genres:", game.genres);
      console.log("Rating:", game.rating);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Usage:
// testSearch("Zelda")
