-- Video Game Store - Supabase Setup SQL
-- Execute this in your Supabase SQL Editor to set up all required tables

-- Games table
CREATE TABLE IF NOT EXISTS games (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  screenshot_url TEXT,
  developer TEXT,
  publisher TEXT,
  genres TEXT,
  platforms TEXT,
  rating DECIMAL,
  release_date TEXT,
  price DECIMAL NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

-- Insert default admin user
INSERT INTO users (username, password_hash) VALUES ('admin', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_games_is_published ON games(is_published);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
