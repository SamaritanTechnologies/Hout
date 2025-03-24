import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  user: null,
  isLoading: true,
  isError: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUserInfoLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserInfoError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.isError = false;
      state.user = null;
    },
  },
});

export const {
  setUser,
  setUserInfoLoading,
  setUserInfoError,
  loginUser,
  logoutUser,
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectUserId = (state) => state.auth.user?.id;
export const selectUserRole = (state) => state.auth.user?.is_superuser;

export const isSuperUser = () => {
  return useSelector(selectUserRole);
};
export const getUserId = () => {
  return useSelector(selectUserId);
};;
export const getLoggedInUser = () => {
  return useSelector(selectUser);
};

export default authSlice.reducer;
