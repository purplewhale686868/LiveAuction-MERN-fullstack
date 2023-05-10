import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,

  wonListings: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    addWonListings: (state, action) => {
      state.wonListings = action.payload.listings;
    },
  },
});

export const { setLogin, setLogout, addWonListings } = authSlice.actions;
export default authSlice.reducer;
