import { createSlice } from "@reduxjs/toolkit";

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
    setUser: (state, action) => {
      state.user = {
        // email: action.payload.email,
        // firstName: action.payload.first_name,
        // lastName: action.payload.last_name,
      };
      // state.user = action.payload;
      // state.userRole = action.payload?.roleName;
    },
    setUserInfoLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserInfoError: (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    },
    loginUserDetail: (state, action) => {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isError = false;
      state.user = {
        role: action.payload.is_superuser,
        accessToken: action.payload.token,
        refreshToken: action.payload.refresh_token,
        id: action.payload.user_id,
        email: action.payload.email,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        phone: action.payload.phone,
        profileImg: action.payload.profile_pic,
      };
      state.userRole = action.payload?.roleName;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.isError = false;
      state.user = null;
      state.userRole = "";
    },
  },
});

export const {
  setUser,
  setUserInfoLoading,
  setUserInfoError,
  loginUserDetail,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;
