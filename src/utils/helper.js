// import paypal from "../assets/cartPage/paypal.svg";
// import ideal from "../assets/cartPage/ideal.svg";
// import klarna from "../assets/cartPage/klarna.svg";
// import bancontact from "../assets/cartPage/bancontact.svg";

import ideal from "../assets/addToCart/ideal.svg";
import paypal from "../assets/addToCart/paypal.svg";
import klarna from "../assets/addToCart/klarna.svg";
import bancontact from "../assets/addToCart/bancontact.svg";
import buyCredit from "../assets/addToCart/buyCredit.svg";

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
  { id: 1, name: "Buy on Credit ", img: buyCredit, checked: false },
  { id: 2, name: "iDeal", img: ideal, checked: false },
  { id: 3, name: "Soft/Klarna", img: klarna, checked: false },
  { id: 4, name: "Bancontact", img: bancontact, checked: true },
  { id: 5, name: "Paypal", img: paypal, checked: false },
];

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // This makes the scrolling smooth
  });
};
