import React from "react";

// PROPS
export interface CopyAlertPropsType {
  isFail: boolean;
  copyAlertRef: any;
}
export interface DetailPropsType {
  copyAlertRef: any;
  setIsCopyFail: Function;
}
export interface NewPropsType {}
export interface PalettesPropsType {
  myPalettesId: Array<string>;
  copyAlertRef: any;
  setIsCopyFail: Function;
}
export interface ProfilePropsType {
  myPalettesId: Array<string>;
}
export interface ButtonPropsType {
  text: string;
  path?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  classes?: Array<string>;
}
export interface PalettePropsType {
  paletteId: string;
  copyAlertRef: any;
  setIsCopyFail: Function;
}

// etc

export interface reduxStateType {
  login: reduxLoginStateType;
  palettes: reduxPalettesStateType;
}

export interface paletteType {
  name: string;
  colors: Array<string>;
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
  data: any;
  loading: boolean;
  error: null | Error;
  lastLoad: any;
}
