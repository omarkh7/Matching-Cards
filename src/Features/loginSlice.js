import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  username: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
  },
});

export const { setUsername, setLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;
