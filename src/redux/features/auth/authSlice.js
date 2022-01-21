import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: {}, isLoggedIn: false, isLoading: true };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, payload) => {
      state.user = { ...payload.payload.user };
      state.isLoggedIn = payload.payload.isLoggedIn;
      state.isLoading = payload.payload.isLoading;
    },
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
