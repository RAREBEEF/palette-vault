import { createAction, createReducer } from "@reduxjs/toolkit";
import { reduxStateType } from "../../types";

export const setLogin = createAction("SET_LOGIN", (isLogin, userObj) => {
  return {
    payload: {
      isLogin,
      userObj,
    },
  };
});

const initialState: reduxStateType = {
  isLogin: false,
  userObj: {},
};

export const getAuth = createReducer(initialState, {
  [setLogin.type]: (state: reduxStateType, action) => {
    return action.payload;
  },
});
