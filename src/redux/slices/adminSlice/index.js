import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productCategories: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    setProductCategories: (state, action) => {
      state.productCategories = action.payload;
    },
  },
});

export const { setProductCategories } = adminSlice.actions;

export default adminSlice.reducer;
