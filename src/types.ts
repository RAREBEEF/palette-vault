import React from "react";

// PROPS
export interface NewPropsType {
  setPalettes: Function;
}
export interface PalettesPropsType {
  palettes: Array<paletteType>;
}
export interface ButtonPropsType {
  text: string;
  path?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: Array<string>;
}

// etc
export interface paletteType {
  name: string;
  colors: Array<string>;
  id: number;
}

export interface userObjType {
  id: string;
  displayName: string;
}

export interface reduxStateType {
  isLoggedIn: boolean;
  userObj: userObjType;
}
