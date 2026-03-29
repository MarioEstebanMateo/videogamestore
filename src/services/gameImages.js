// Popular games with real working image URLs
export const POPULAR_GAMES_IMAGES = {
  zelda:
    "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=400&fit=crop",
  "elden ring":
    "https://images.unsplash.com/photo-1566036782092-ec76699dc621?w=300&h=400&fit=crop",
  cyberpunk:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=400&fit=crop",
  minecraft:
    "https://images.unsplash.com/photo-1611584291446-074e107db965?w=300&h=400&fit=crop",
  hades:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
  stardew:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
  witcher:
    "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=300&h=400&fit=crop",
  "hollow knight":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop",
  "dark souls":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=400&fit=crop",
  fortnite:
    "https://images.unsplash.com/photo-1535348519-670fc5013622?w=300&h=400&fit=crop",
  gta: "https://images.unsplash.com/photo-1538803691192-1aa38c4bb8c3?w=300&h=400&fit=crop",
  "call of duty":
    "https://images.unsplash.com/photo-1522869635100-ce306e08ce4f?w=300&h=400&fit=crop",
  fifa: "https://images.unsplash.com/photo-1535348519-670fc5013622?w=300&h=400&fit=crop",
  mario:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=400&fit=crop",
  sonic:
    "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=400&fit=crop",
};

export const getGameImageByName = (gameName) => {
  if (!gameName) return null;

  const name = gameName.toLowerCase();

  // Check for exact match
  if (POPULAR_GAMES_IMAGES[name]) {
    return POPULAR_GAMES_IMAGES[name];
  }

  // Check for partial matches
  for (const [key, url] of Object.entries(POPULAR_GAMES_IMAGES)) {
    if (name.includes(key) || key.includes(name.split(" ")[0])) {
      return url;
    }
  }

  return null;
};
