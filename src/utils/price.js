/**
 * Pure price parsing and formatting. Kept separate from `helper.js` so pricing
 * logic can be imported (and tested) without pulling in image assets.
 *
 * The API returns decimals as strings with a comma separator ("1000,00").
 */

/**
 * @param {string|number} price - Price string (e.g., "1000,00" or "1000.00") or number
 * @returns {number} - Parsed number
 */
export const parsePrice = (price) => {
  if (price === null || price === undefined || price === "") {
    return 0;
  }
  if (typeof price === "number") {
    return price;
  }
  const normalizedPrice = String(price).replace(",", ".");
  return parseFloat(normalizedPrice) || 0;
};

/**
 * Formats a number with comma as decimal separator (e.g., 1000.00 -> "1000,00")
 * @param {number|string} price - Price to format
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, decimals = 2) => {
  const numPrice = parsePrice(price);
  const fixed = numPrice.toFixed(decimals);
  return fixed.replace(".", ",");
};
