// Local database service using localStorage
// This simulates a backend - can be easily replaced with Supabase later

const DB_KEY = "videogamestore_db";

const defaultDB = {
  games: [
    {
      id: "1",
      title: "The Legend of Zelda: Breath of the Wild",
      description:
        "An open-world action-adventure game featuring Link's quest to save Hyrule.",
      genre: "Action-Adventure",
      rating: 9.7,
      image_url: "https://via.placeholder.com/300x400?text=Zelda+BotW",
      stock: 15,
      price: 59.99,
      is_published: true,
      created_at: new Date().toISOString(),
    },
  ],
  users: [],
  orders: [],
};

// Get database from localStorage
const getDB = () => {
  const stored = localStorage.getItem(DB_KEY);
  return stored ? JSON.parse(stored) : defaultDB;
};

// Save database to localStorage
const saveDB = (db) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// ============= GAMES =============

export const getAllGames = async (published = true) => {
  const db = getDB();
  if (published) {
    return db.games.filter((g) => g.is_published);
  }
  return db.games;
};

export const getGameById = async (id) => {
  const db = getDB();
  return db.games.find((g) => g.id === id);
};

export const createGame = async (gameData) => {
  const db = getDB();
  const newGame = {
    id: Date.now().toString(),
    ...gameData,
    is_published: false,
    created_at: new Date().toISOString(),
  };
  db.games.push(newGame);
  saveDB(db);
  return newGame;
};

export const updateGame = async (id, gameData) => {
  const db = getDB();
  const index = db.games.findIndex((g) => g.id === id);
  if (index !== -1) {
    db.games[index] = { ...db.games[index], ...gameData };
    saveDB(db);
    return db.games[index];
  }
  throw new Error("Game not found");
};

export const publishGame = async (id, stockData) => {
  const db = getDB();
  const game = db.games.find((g) => g.id === id);
  if (game) {
    game.stock = stockData.stock;
    game.price = stockData.price;
    game.is_published = true;
    saveDB(db);
    return game;
  }
  throw new Error("Game not found");
};

export const deleteGame = async (id) => {
  const db = getDB();
  db.games = db.games.filter((g) => g.id !== id);
  saveDB(db);
};

// ============= ORDERS =============

export const createOrder = async (userId, items, totalPrice) => {
  const db = getDB();
  const newOrder = {
    id: Date.now().toString(),
    user_id: userId,
    items: items,
    total_price: totalPrice,
    status: "completed",
    created_at: new Date().toISOString(),
  };
  db.orders.push(newOrder);
  saveDB(db);
  return newOrder;
};

export const getUserOrders = async (userId) => {
  const db = getDB();
  return db.orders.filter((o) => o.user_id === userId);
};
