// Local authentication service
// Simulates user authentication - can be replaced with Supabase Auth later

const USERS_KEY = "videogamestore_users";
const CURRENT_USER_KEY = "videogamestore_current_user";

// Default admin user
const defaultAdmin = {
  id: "0",
  email: "admin",
  username: "admin",
  password: "admin",
  is_admin: true,
  created_at: new Date().toISOString(),
};

const getUsers = () => {
  const stored = localStorage.getItem(USERS_KEY);
  const users = stored ? JSON.parse(stored) : [defaultAdmin];

  // Ensure admin always exists
  if (!users.find((u) => u.email === "admin")) {
    users.push(defaultAdmin);
    saveUsers(users);
  }

  return users;
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = () => {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sign up
export const signup = async (email, password, username) => {
  const users = getUsers();

  // Validate email format for non-admin users
  if (email !== "admin" && !isValidEmail(email)) {
    throw new Error("Please enter a valid email address");
  }

  // Check if email already exists
  if (users.find((u) => u.email === email)) {
    throw new Error("Email/username already registered");
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    username,
    password: password, // In production, hash this!
    created_at: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return newUser;
};

// Login
export const login = async (email, password) => {
  const users = getUsers();
  let user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid username/email or password");
  }

  // Ensure admin user has is_admin flag
  if (user.email === "admin" && !user.is_admin) {
    user.is_admin = true;
    saveUsers(users);
  }

  setCurrentUser(user);
  return user;
};

// Logout
export const logout = async () => {
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
