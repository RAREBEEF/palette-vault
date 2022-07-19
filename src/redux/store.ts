import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { login } from "./modules/logIn";
import thunk from "redux-thunk";
import { reducer as palettes } from "./modules/palettes";

const reducer = combineReducers({
  login: login.reducer,
  palettes: palettes,
});

const store = configureStore({
  reducer: reducer,
  middleware: [thunk],
});

export default store;
