import { supabase } from "./supabaseClient";

// ============= GAMES =============

export const getAllGames = async (published = true) => {
  try {
    let query = supabase.from("games").select("*");

    if (published) {
      query = query.eq("is_published", true);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const getGameById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("games")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = row not found
    return data || null;
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
};

export const createGame = async (gameData) => {
  try {
    const newGame = {
      id: Date.now().toString(),
      ...gameData,
      is_published:
        gameData.is_published !== undefined ? gameData.is_published : false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("games")
      .insert([newGame])
      .select();

    if (error) throw error;
    return data?.[0] || newGame;
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
};

export const updateGame = async (id, gameData) => {
  try {
    const { data, error } = await supabase
      .from("games")
      .update({
        ...gameData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
};

export const publishGame = async (id, stockData) => {
  try {
    const { data, error } = await supabase
      .from("games")
      .update({
        stock: stockData.stock,
        price: stockData.price,
        is_published: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select();

    if (error) throw error;
    return data?.[0] || null;
  } catch (error) {
    console.error("Error publishing game:", error);
    throw error;
  }
};

export const deleteGame = async (id) => {
  try {
    const { error } = await supabase.from("games").delete().eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
};

// ============= CHECKOUT (reducir stock) =============

export const checkout = async (items) => {
  try {
    // Reduce stock for each item purchased
    for (const item of items) {
      const game = await getGameById(item.id);
      if (game) {
        await updateGame(item.id, {
          stock: Math.max(0, game.stock - item.quantity),
        });
      }
    }
  } catch (error) {
    console.error("Error in checkout:", error);
    throw error;
  }
};

// ============= USERS =============

export const createUser = async (userData) => {
  try {
    const newUser = {
      username: userData.username,
      password_hash: userData.password_hash,
    };

    const { data, error } = await supabase
      .from("users")
      .insert([newUser])
      .select();

    if (error) throw error;
    return data?.[0] || newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") throw error;
    return data || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
