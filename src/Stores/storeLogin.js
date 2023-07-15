import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../Features/loginSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;