// Local cart service
// Stores cart in localStorage per user

const CART_KEY = "videogamestore_cart";

const getCart = (userId) => {
  const key = `${CART_KEY}_${userId}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const saveCart = (userId, items) => {
  const key = `${CART_KEY}_${userId}`;
  localStorage.setItem(key, JSON.stringify(items));
};

export const getCartItems = async (userId) => {
  return getCart(userId);
};

export const addToCart = async (userId, game) => {
  const cart = getCart(userId);
  const existingItem = cart.find((item) => item.id === game.id);

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
};

export const removeFromCart = async (userId, gameId) => {
  const cart = getCart(userId);
  const filtered = cart.filter((item) => item.id !== gameId);
  saveCart(userId, filtered);
  return filtered;
};

export const updateCartItem = async (userId, gameId, quantity) => {
  const cart = getCart(userId);
  const item = cart.find((item) => item.id === gameId);

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(userId, gameId);
    }
    item.quantity = quantity;
    saveCart(userId, cart);
  }

  return cart;
};

export const clearCart = async (userId) => {
  const key = `${CART_KEY}_${userId}`;
  localStorage.removeItem(key);
  return [];
};

export const getCartTotal = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartCount = (items) => {
  return items.reduce((count, item) => count + item.quantity, 0);
};
