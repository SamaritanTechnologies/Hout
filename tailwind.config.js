/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: { min: "320px", max: "575px" },

      sm: { min: "576px", max: "767px" },
      // => @media (min-width: 640px and max-width: 767px) { ... }

      md: { min: "768px", max: "991px" },
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      lg: { min: "992px", max: "1200px" },
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      xl: { min: "1201px" },
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      // "2xl": { min: "1921px" },
      // => @media (min-width: 1536px) { ... }
      xxl: { min: "1501px" },
    },
    extend: {
      fontSize: {
        60: "3.75rem",
        56: "3.5rem",
        52: "3.25rem",
        54: "3.375rem",
        50: "3.125rem",
        48: "3rem",
        46: "2.875rem",
        44: "2.75rem",
        40: "2.5rem",
        38: "2.375rem",
        36: "2.25rem",
        34: "2.125rem",
        32: "2rem",
        30: "1.875rem",
        28: "1.75rem",
        26: "1.625rem",
        25: "1.5625rem",
        24: "1.5rem",
        22: "1.375rem",
        20: "1.25rem",
        18: "1.125rem",
        16: "1rem",
        15: "0.9375rem",
        14: "0.875rem",
        12: "0.75rem",
        10: "0.625rem",
        8: "0.5rem",
      },

      colors: {
        primary: "#fff",
        secondary: "#000000",
        customYellow: "#FBC700",
        red: "#D93F21",
        green: "20DC49",
        green1: "#00B69B",
        toggle: "#C9C9C9",
        gray: "#D9D9D9",
        gray1: "#767676",
        gray2: "#898989",
        gray3: "#202224",
        customGray: "#BDBDBD",
        transparentGray: "#60606061",
        red: "#CA1717",
        orange: "#FFA14E",
        white: "#fff",
        orange: "#FCBE2D",
      },

      fontFamily: {
          main: ["Josefin Sans"],
          footer1: ["Poppins"],
          footer2: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
