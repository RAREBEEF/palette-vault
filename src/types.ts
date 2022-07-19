import React from "react";

// PROPS
export interface NewPropsType {}
export interface PalettesPropsType {}
export interface ButtonPropsType {
  text: string;
  path?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: Array<string>;
}

// etc
export interface reduxStateType {
  login: reduxLoginStateType;
  palettes: reduxPalettesStateType;
}
export interface paletteType {
  name: string;
  colors: Array<string>;
  id: string;
  createdAt: number;
  creator: string;
}

export interface userObjType {
  id: string;
  displayName: string;
}

export interface reduxLoginStateType {
  isLoggedIn: boolean;
  userObj: userObjType;
}

export interface reduxPalettesStateType {
  data: Array<paletteType> | [];
  loading: boolean;
  error: null | Error;
}
