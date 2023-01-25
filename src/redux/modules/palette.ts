import { firebase } from "../../fb";
import { paletteType, reduxPaletteStateType } from "../../types";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import React from "react";

export const GET_PALETTE_START = "GET_PALETTE_START";
export const GET_PALETTE_SUCCESS = "GET_PALETTE_SUCCESS";
export const GET_PALETTE_FAIL = "GET_PALETTE_FAIL";

const getPaletteStart = () => {
  return {
    type: GET_PALETTE_START,
  };
};

const getPaletteSuccess = (data: paletteType) => {
  return {
    type: GET_PALETTE_SUCCESS,
    data,
  };
};

const getPaletteFail = (error: unknown) => {
  return {
    type: GET_PALETTE_FAIL,
    error,
  };
};

export const getPaletteThunk = (id: string = "") => {
  return async (dispatch: React.Dispatch<any>) => {
    try {
      dispatch(getPaletteStart());

      const docRef = doc(getFirestore(firebase), "palettes", id);

      await getDoc(docRef).then((doc) => {
        dispatch(getPaletteSuccess(doc.data() as paletteType));
      });
    } catch (error) {
      window.alert("팔레트를 불러오는데 실패하였습니다.");
      dispatch(getPaletteFail(error));
    }
  };
};

export const reducer = (prev = initialState, action: any) => {
  switch (action.type) {
    case GET_PALETTE_START: {
      return { ...prev, loading: true, error: null };
    }
    case GET_PALETTE_SUCCESS: {
      return {
        ...prev,
        loading: false,
        error: null,
        data: action.refresh ? action.data : { ...prev.data, ...action.data },
      };
    }
    case GET_PALETTE_FAIL: {
      return {
        ...prev,
        loading: false,
        error: action.error,
        data: {},
      };
    }
    default:
      return prev;
  }
};

const initialState: reduxPaletteStateType = {
  data: null,
  loading: false,
  error: null,
};
