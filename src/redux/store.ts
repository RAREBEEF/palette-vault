import { configureStore } from "@reduxjs/toolkit";
import { login } from "./modules/logIn";

const store = configureStore({
  reducer: login.reducer,
});

export default store;
