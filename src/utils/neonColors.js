// Neon color palette
const NEON_COLORS = [
  {
    rgb: "rgba(58, 134, 255, 1)",
    rgba: (alpha = 1) => `rgba(58, 134, 255, ${alpha})`,
    name: "Blue",
  },
  {
    rgb: "rgba(168, 85, 247, 1)",
    rgba: (alpha = 1) => `rgba(168, 85, 247, ${alpha})`,
    name: "Purple",
  },
  {
    rgb: "rgba(34, 211, 238, 1)",
    rgba: (alpha = 1) => `rgba(34, 211, 238, ${alpha})`,
    name: "Cyan",
  },
  {
    rgb: "rgba(236, 72, 153, 1)",
    rgba: (alpha = 1) => `rgba(236, 72, 153, ${alpha})`,
    name: "Pink",
  },
  {
    rgb: "rgba(34, 197, 94, 1)",
    rgba: (alpha = 1) => `rgba(34, 197, 94, ${alpha})`,
    name: "Green",
  },
  {
    rgb: "rgba(249, 115, 22, 1)",
    rgba: (alpha = 1) => `rgba(249, 115, 22, ${alpha})`,
    name: "Orange",
  },
  {
    rgb: "rgba(59, 130, 246, 1)",
    rgba: (alpha = 1) => `rgba(59, 130, 246, ${alpha})`,
    name: "Indigo",
  },
  {
    rgb: "rgba(168, 85, 247, 1)",
    rgba: (alpha = 1) => `rgba(168, 85, 247, ${alpha})`,
    name: "Violet",
  },
];

/**
 * Generate a hash from a string (game ID or title)
 * @param {string} str - The string to hash
 * @returns {number} - A numeric hash
 */
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Get a neon color based on a game's ID or title
 * @param {string} gameId - The unique identifier for the game
 * @returns {object} - Object with color properties
 */
export function getNeonColor(gameId) {
  const hash = hashCode(gameId);
  const colorIndex = hash % NEON_COLORS.length;
  return NEON_COLORS[colorIndex];
}

/**
 * Get CSS variables string for a game's neon color
 * @param {string} gameId - The unique identifier for the game
 * @returns {string} - CSS variable assignments
 */
export function getNeonColorStyle(gameId) {
  const color = getNeonColor(gameId);
  return {
    "--neon-color": color.rgb,
    "--neon-color-bright": color.rgba(0.9),
    "--border-color": color.rgba(0.5),
  };
}
