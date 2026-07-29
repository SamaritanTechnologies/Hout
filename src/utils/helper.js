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

// Re-exported so the many existing `from "../utils/helper"` imports keep working.
export { parsePrice, formatPrice } from "./price";

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

// Open PDF directly in new tab
export const openPDFWithAutoPrint = (pdfUrl) => {
  if (!pdfUrl) return null;
  return window.open(pdfUrl, '_blank');
};

// Open PDF directly in same tab
export const openPDFWithAutoPrintSameTab = (pdfUrl) => {
  if (!pdfUrl) return;
  window.location.href = pdfUrl;
};

// Alternative function to download PDF directly instead of opening in new window
export const downloadPDF = (pdfUrl, filename = 'label.pdf') => {
  if (!pdfUrl) return;

  try {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading PDF:", error);
    // Fallback: open in same tab
    window.location.href = pdfUrl;
  }
};