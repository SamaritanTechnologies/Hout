// cartSummarySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subtotal: 0,
  deliveryFee: 0,
  tax: 0,
  youSaved: 0,
  total: 0,
};

const cartSummarySlice = createSlice({
  name: "cartSummary",
  initialState,
  reducers: {
    setCartSummaryData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetCartSummaryData: () => initialState,
  },
});

export const { setCartSummaryData, resetCartSummaryData } =
  cartSummarySlice.actions;

export default cartSummarySlice.reducer;
