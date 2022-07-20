import React from "react";

// PROPS
export interface NewPropsType {}
export interface PalettesPropsType {
  myPalettes: Array<paletteType> | [];
}
export interface ProfilePropsType {
  myPalettes: Array<paletteType> | [];
}
export interface ButtonPropsType {
  text: string;
  path?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: Array<string>;
}
export interface PalettePropsType {
  palette: paletteType;
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
  author: string;
}

export interface userObjType {
  id: string;
  displayName: string;
}

export interface reduxLoginStateType {
  isLoggedIn: boolean | null;
  userObj: userObjType;
}

export interface reduxPalettesStateType {
  data: Array<paletteType> | [] | null;
  loading: boolean;
  error: null | Error;
}
