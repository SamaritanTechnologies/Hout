// import paypal from "../assets/cartPage/paypal.svg";
// import ideal from "../assets/cartPage/ideal.svg";
// import klarna from "../assets/cartPage/klarna.svg";
// import bancontact from "../assets/cartPage/bancontact.svg";

import ideal from "../assets/addToCart/ideal.svg";
import paypal from "../assets/addToCart/paypal.svg";
import klarna from "../assets/addToCart/klarna.svg";
import bancontact from "../assets/addToCart/bancontact.svg";
import buyCredit from "../assets/addToCart/buyCredit.svg";
import cash from "../assets/addToCart/cash.png";

export const itemDescription = [
  {
    id: 1,
    name: "Pick-Up",
    value: "Estimated Date for Pick-up ...",
    checked: false,
  },
  {
    id: 2,
    name: "Quick Pick-Up",
    value: "Estimated Date for Pick-up ...",
    checked: false,
  },
  {
    id: 3,
    name: "Delivery",
    value: "Estimated Date for Pick-up ...",
    checked: true,
  },
  {
    id: 4,
    name: "Quick Delivery",
    value: "Estimated Date for Pick-up ...",
    checked: false,
  },
];

export const paymentMethods = [
  { id: 1, name: "Cash", img: cash, checked: false },
  { id: 2, name: "Buy on Credit ", img: buyCredit, checked: false },
  { id: 3, name: "iDeal", img: ideal, checked: false },
  { id: 4, name: "Soft/Klarna", img: klarna, checked: false },
  { id: 5, name: "Bancontact", img: bancontact, checked: true },
  { id: 6, name: "Paypal", img: paypal, checked: false },
];

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // This makes the scrolling smooth
  });
};

export const scrollDashboardToTop = () => {
  const dashboardContent = document.querySelector('.dashboard-content');
  if (dashboardContent) {
    dashboardContent.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    // Fallback to window scroll if dashboard-content not found
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

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
  // Replace dot with comma for display
  return fixed.replace(".", ",");
};