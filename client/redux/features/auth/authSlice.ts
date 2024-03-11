import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: "",
  },
  reducers: {
    userRegistration(state, action) {
      state.token = action.payload.accessToken;
    },
    userLoggedIn(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.accessToken;
    },
    userLogOut(state) {
      state.user = "";
      state.token = "";
    },
  },
});

export const { userRegistration, userLoggedIn, userLogOut } = authSlice.actions;
