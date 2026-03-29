import * as db from "./db";

const CURRENT_USER_KEY = "videogamestore_current_user";

// Get current user from localStorage
export const getCurrentUser = () => {
  try {
    const stored =
      typeof window !== "undefined"
        ? localStorage.getItem(CURRENT_USER_KEY)
        : null;
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

// Set current user in localStorage
const setCurrentUser = (user) => {
  try {
    if (user) {
      if (typeof window !== "undefined") {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      }
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
  } catch (error) {
    console.error("Error setting current user:", error);
  }
};

// Ensure admin user exists (created via SQL in Supabase)
const ensureAdminExists = async () => {
  // Admin is now created directly in the database via SQL
  // No need to check or create it here
};

// Initialize admin on startup
ensureAdminExists();

// Sign up
export const signup = async (username, password) => {
  try {
    // Prevent registration as admin
    if (username.toLowerCase() === "admin") {
      throw new Error("This username is reserved and cannot be used");
    }

    // Check if username already exists
    const existingUser = await db.getUserByUsername(username);
    if (existingUser) {
      throw new Error("Username already registered");
    }

    // Create user in database
    const newUser = await db.createUser({
      username: username,
      password_hash: password, // In production, hash this with bcryptjs!
    });

    // Set as current user
    setCurrentUser(newUser);

    return newUser;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Login
export const login = async (username, password) => {
  try {
    // Find user by username
    const user = await db.getUserByUsername(username);

    if (!user || user.password_hash !== password) {
      throw new Error("Invalid username or password");
    }

    // Set as current user
    setCurrentUser(user);

    return user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Logout
export const logout = () => {
  setCurrentUser(null);
};

// Get current user
export const getMe = async () => {
  return getCurrentUser();
};

// Check if user is logged in
export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};
