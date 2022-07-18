import { createSlice } from "@reduxjs/toolkit";
import { reduxStateType } from "../../types";

const initialState: reduxStateType = {
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
