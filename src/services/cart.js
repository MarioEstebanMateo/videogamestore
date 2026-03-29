// Cart service using localStorage
// Stores cart items in browser localStorage per user

import * as db from "./db.js";

const CART_KEY = "videogamestore_cart";

const getCart = (userId) => {
  const key = `${CART_KEY}_${userId}`;
  const stored =
    typeof window !== "undefined" ? localStorage.getItem(key) : null;
  return stored ? JSON.parse(stored) : [];
};

const saveCart = (userId, items) => {
  const key = `${CART_KEY}_${userId}`;
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(items));
  }
};

export const getCartItems = async (userId) => {
  try {
    if (!userId) return [];
    return getCart(userId);
  } catch (error) {
    console.error("Error getting cart items:", error);
    return [];
  }
};

export const addToCart = async (userId, game) => {
  try {
    if (!userId) throw new Error("User not authenticated");

    const cart = getCart(userId);
    const existingItem = cart.find((item) => item.id === game.id);

    // Get current stock from db
    const currentGame = await db.getGameById(game.id);
    const availableStock = currentGame.stock;

    const currentQuantity = existingItem ? existingItem.quantity : 0;
    if (currentQuantity + 1 > availableStock) {
      throw new Error(
        `Not enough stock available. Available: ${availableStock}`,
      );
    }

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...game,
        quantity: 1,
      });
    }

    saveCart(userId, cart);
    return cart;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};

export const removeFromCart = async (userId, gameId) => {
  try {
    if (!userId) throw new Error("User not authenticated");
    const cart = getCart(userId);
    const filtered = cart.filter((item) => item.id !== gameId);
    saveCart(userId, filtered);
    return filtered;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
};

export const updateCartItem = async (userId, gameId, quantity) => {
  try {
    if (!userId) throw new Error("User not authenticated");

    const cart = getCart(userId);
    const item = cart.find((item) => item.id === gameId);

    if (item) {
      if (quantity <= 0) {
        return await removeFromCart(userId, gameId);
      }

      // Get current stock from db
      const currentGame = await db.getGameById(gameId);
      if (quantity > currentGame.stock) {
        throw new Error(
          `Not enough stock available. Available: ${currentGame.stock}`,
        );
      }

      item.quantity = quantity;
      saveCart(userId, cart);
    }

    return cart;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

export const clearCart = async (userId) => {
  try {
    if (!userId) throw new Error("User not authenticated");
    const key = `${CART_KEY}_${userId}`;
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
    return [];
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw error;
  }
};

export const checkout = async (userId) => {
  try {
    if (!userId) throw new Error("User not authenticated");

    const cart = getCart(userId);
    for (const item of cart) {
      const game = await db.getGameById(item.id);
      if (game.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${game.title}`);
      }
      await db.updateGame(item.id, { stock: game.stock - item.quantity });
    }
    // Clear cart after successful checkout
    return await clearCart(userId);
  } catch (error) {
    console.error("Error during checkout:", error);
    throw error;
  }
};

export const getCartTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartCount = (items) => {
  return items.reduce((count, item) => count + item.quantity, 0);
};
