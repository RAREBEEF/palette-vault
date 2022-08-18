import React from "react";

// PROPS
export interface InstallPropsType {
  deferredPrompt: any;
}
export interface NavPropsType {
  isInstalled: any;
}
export interface CopyAlertPropsType {
  copyAlertRef: any;
}
export interface DetailPropsType {
  copyAlertRef: any;
}
export interface NewPropsType {}
export interface PalettesPropsType {
  myPalettesId: Array<string>;
  copyAlertRef: any;
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
