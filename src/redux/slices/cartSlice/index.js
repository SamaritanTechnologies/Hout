import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCartItems } = cartSlice.actions;

export default cartSlice.reducer;
