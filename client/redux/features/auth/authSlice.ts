import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: null,
  },
  reducers: {
    userRegistration(state, action) {
      state.token = action.payload.token;
    },
    userLoggedIn(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    userLogOut(state) {
      state.user = null;
      state.token = "";
    },
    userGetData(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const { userRegistration, userLoggedIn, userLogOut } = authSlice.actions;

export default authSlice.reducer;
