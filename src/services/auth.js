// Local authentication service
// Simulates user authentication - can be replaced with Supabase Auth later

const USERS_KEY = "videogamestore_users";
const CURRENT_USER_KEY = "videogamestore_current_user";

const getUsers = () => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getCurrentUser = () => {
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

// Sign up
export const signup = async (email, password, username) => {
  const users = getUsers();

  // Check if email already exists
  if (users.find((u) => u.email === email)) {
    throw new Error("Email already registered");
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
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    throw new Error("Invalid email or password");
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
