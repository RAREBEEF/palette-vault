import { firebase } from "../../fb";
import { paletteType, reduxPalettesStateType } from "../../types";
import {
  collection,
  query,
  onSnapshot,
  getFirestore,
  orderBy,
} from "firebase/firestore";
import React from "react";

export const GET_PALETTES_START = "GET_PALETTES_START";
export const GET_PALETTES_SUCCESS = "GET_PALETTES_SUCCESS";
export const GET_PALETTES_FAIL = "GET_PALETTES_FAIL";

const getPalettesStart = () => {
  return {
    type: GET_PALETTES_START,
  };
};

const getPalettesSuccess = (data: paletteType) => {
  return {
    type: GET_PALETTES_SUCCESS,
    data,
  };
};

const getPalettesFail = (error: unknown) => {
  return {
    type: GET_PALETTES_FAIL,
    error,
  };
};

export const getPalettesThunk = () => {
  return async (dispatch: React.Dispatch<any>) => {
    try {
      dispatch(getPalettesStart());

      const q = query(
        collection(getFirestore(firebase), "palettes"),
        orderBy("createdAt", "desc")
      );

      onSnapshot(q, (querySnapshot) => {
        const palettesData: any = [];

        querySnapshot.forEach((doc) => {
          palettesData.push({ ...doc.data(), id: doc.id });
        });

        dispatch(getPalettesSuccess(palettesData));
      });
    } catch (error) {
      window.alert("팔레트를 불러오는데 실패하였습니다.")
      dispatch(getPalettesFail(error));
    }
  };
};

export const reducer = (prev = initialState, action: any) => {
  switch (action.type) {
    case GET_PALETTES_START: {
      return { ...prev, loading: true, error: null };
    }
    case GET_PALETTES_SUCCESS: {
      return { ...prev, loading: false, error: null, data: action.data };
    }
    case GET_PALETTES_FAIL: {
      return {
        ...prev,
        loading: false,
        error: action.error,
        data: [],
      };
    }
    default:
      return prev;
  }
};

const initialState: reduxPalettesStateType = {
  data: null,
  loading: false,
  error: null,
};
