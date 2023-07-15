import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "../Features/boardSlice";
import loginReducer from "../Features/loginSlice";

const rootReducer = {
  board: boardReducer,
  login: loginReducer,
};
const store = configureStore({
  reducer: rootReducer,
});
export default store;
