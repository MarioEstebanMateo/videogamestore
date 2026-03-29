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
      image_url:
        "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=400&fit=crop",
      stock: 15,
      price: 59.99,
      is_published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Elden Ring",
      description:
        "A masterpiece of dark fantasy action RPG by FromSoftware and George R. R. Martin.",
      genre: "Action RPG",
      rating: 9.5,
      image_url:
        "https://images.unsplash.com/photo-1566036782092-ec76699dc621?w=300&h=400&fit=crop",
      stock: 20,
      price: 59.99,
      is_published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Cyberpunk 2077",
      description:
        "An open-world action RPG set in a dystopian future metropolis.",
      genre: "Action RPG",
      rating: 8.2,
      image_url:
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=400&fit=crop",
      stock: 12,
      price: 49.99,
      is_published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Stardew Valley",
      description:
        "A relaxing farming simulator with adventure and romance elements.",
      genre: "Simulation",
      rating: 9.2,
      image_url:
        "https://images.unsplash.com/photo-1611584291446-074e107db965?w=300&h=400&fit=crop",
      stock: 25,
      price: 14.99,
      is_published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Hades",
      description:
        "A roguelike dungeon crawler with stunning art and engaging combat.",
      genre: "Roguelike",
      rating: 9.1,
      image_url:
        "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=300&h=400&fit=crop",
      stock: 18,
      price: 24.99,
      is_published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "6",
      title: "Minecraft",
      description: "Build, explore, and survive in an infinite blocky world.",
      genre: "Sandbox",
      rating: 9.4,
      image_url:
        "https://images.unsplash.com/photo-1538481143081-267f06b348bb?w=300&h=400&fit=crop",
      stock: 30,
      price: 26.95,
      is_published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "7",
      title: "The Witcher 3",
      description:
        "Epic fantasy RPG with rich storytelling and monster hunting.",
      genre: "Action RPG",
      rating: 9.3,
      image_url:
        "https://images.unsplash.com/photo-1518611505868-d7e843982d6f?w=300&h=400&fit=crop",
      stock: 10,
      price: 39.99,
      is_published: true,
      created_at: new Date().toISOString(),
    },
    {
      id: "8",
      title: "Hollow Knight",
      description: "A challenging metroidvania with beautiful hand-drawn art.",
      genre: "Metroidvania",
      rating: 8.8,
      image_url:
        "https://images.unsplash.com/photo-1573521193529-fbb75c612e4f?w=300&h=400&fit=crop",
      stock: 22,
      price: 14.99,
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
