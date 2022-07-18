import { configureStore } from "@reduxjs/toolkit";
import { getAuth } from "./modules/getAuth";

const store = configureStore({
  reducer: getAuth,
});

export default store;
