# RAWG API Setup Guide

## Overview

This Video Game Store uses the **RAWG API** to fetch game data. RAWG is a free, comprehensive game database with thousands of games across all platforms.

## Why RAWG?

- 📚 **Comprehensive**: Largest game database with 700K+ games
- ✅ **Free Tier**: No credit card required for free API key
- 🔄 **Actively Maintained**: Regularly updated with new games and data
- 📱 **Multiple Platforms**: Windows, Mac, Linux, PlayStation, Xbox, Nintendo, etc.
- 🎮 **Rich Data**: Genres, developers, platforms, ratings, release dates, and more

## Getting Your Free API Key

### Step 1: Visit RAWG API Documentation

Go to [https://rawg.io/apidocs](https://rawg.io/apidocs)

### Step 2: Sign Up (Free)

1. Click on "Sign up" or scroll to the signup form
2. Enter your email address
3. Create a password
4. Check your email for verification (or it might auto-verify)

### Step 3: Get Your API Key

1. After signing up, go to your profile
2. Your API key will be generated automatically
3. Copy the API key (it's a long string of characters)

### Step 4: Add to `.env` File

1. Open the `.env` file in the project root
2. Find this line:
   ```
   VITE_RAWG_API_KEY=YOUR_RAWG_API_KEY
   ```
3. Replace `YOUR_RAWG_API_KEY` with your actual API key:
   ```
   VITE_RAWG_API_KEY=abc123def456ghi789jkl012mno345pqr
   ```
4. Save the file

### Step 5: Restart Development Server

1. If the dev server is running, stop it (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```
3. The `.env` changes will now be loaded

## Testing the Integration

### In Admin Panel

1. Go to Admin Panel
2. Click "Search Games"
3. Enter a game name (e.g., "Elden Ring", "Cyberpunk", "Mario")
4. Click "Search"
5. You should see game results with images, descriptions, genres, platforms, and ratings

### Troubleshooting

**Error: "RAWG API key is required"**

- Make sure you added the API key to the `.env` file
- Make sure you restarted the dev server after adding the key
- Check that the API key is not `YOUR_RAWG_API_KEY` (placeholder text)

**Error: "API error: 401"**

- Your API key is invalid
- Go to https://rawg.io/apidocs and verify your key is correct
- Copy the entire key without extra spaces

**No search results appear**

- Make sure the game name is spelled correctly
- Try a popular game like "The Last of Us" or "Grand Theft Auto"
- Check the browser console (F12 → Console tab) for error messages

## API Key Security

**Important**: Never commit your API key to version control!

The `.env` file is already in `.gitignore`, so your key won't be accidentally shared. However:

- ✅ DO keep your API key in the `.env` file
- ❌ DON'T commit the `.env` file to git
- ❌ DON'T share your API key publicly
- ❌ DON'T post it in issues or forums

## Rate Limits

The RAWG free tier has rate limits:

- Requests are limited based on fair use
- For a small store, this should be plenty
- If you need more, RAWG offers paid plans

## Need Help?

- RAWG API Documentation: [https://rawg.io/apidocs](https://rawg.io/apidocs)
- RAWG Community: [https://rawg.io/](https://rawg.io/)
- Check browser console (F12) for detailed error messages

## What's Next?

Once your API key is working:

1. Search for games in the Admin Panel
2. Configure stock and price
3. Publish games to your store
4. Customers can browse and purchase

Enjoy your Video Game Store! 🎮
