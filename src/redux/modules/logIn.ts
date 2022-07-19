import { createSlice } from "@reduxjs/toolkit";
import { reduxLoginStateType } from "../../types";

const initialState: reduxLoginStateType = {
  isLoggedIn: false,
  userObj: { id: "", displayName: "" },
};

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLogIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userObj = action.payload.userObj;
    },
  },
});
