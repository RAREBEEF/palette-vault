import { firebase } from "../../fb";
import { paletteType, reduxPalettesStateType } from "../../types";
import {
  collection,
  query,
  getFirestore,
  orderBy,
  limit,
  startAfter,
  Query,
  endAt,
  getDocs,
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

const getPalettesSuccess = (data: paletteType, lastLoad: any, refresh: any) => {
  return {
    type: GET_PALETTES_SUCCESS,
    data,
    lastLoad,
    refresh,
  };
};

const getPalettesFail = (error: unknown) => {
  return {
    type: GET_PALETTES_FAIL,
    error,
  };
};

export const getPalettesThunk = (
  lastLoad: any = null,
  refresh: boolean = false
) => {
  return async (dispatch: React.Dispatch<any>) => {
    try {
      dispatch(getPalettesStart());

      let q: Query;

      if (refresh) {
        q = query(
          collection(getFirestore(firebase), "palettes"),
          orderBy("createdAt", "desc"),
          endAt(lastLoad)
        );
      } else if (lastLoad) {
        q = query(
          collection(getFirestore(firebase), "palettes"),
          orderBy("createdAt", "desc"),
          startAfter(lastLoad),
          limit(12)
        );
      } else {
        q = query(
          collection(getFirestore(firebase), "palettes"),
          orderBy("createdAt", "desc"),
          limit(12)
        );
      }

      await getDocs(q).then((docSnap) => {
        const palettesData: any = {};
        const lastLoad = docSnap.docs[docSnap.docs.length - 1];

        docSnap.forEach((doc) => {
          palettesData[doc.id] = { ...doc.data() };
        });

        dispatch(getPalettesSuccess(palettesData, lastLoad, refresh));
      });
    } catch (error) {
      window.alert("팔레트를 불러오는데 실패하였습니다.");
      dispatch(getPalettesFail(error));
    }
  };
};

export const reducer = (prev = initialState, action: any) => {
  switch (action.type) {
    case GET_PALETTES_START: {
      return { ...prev, loading: true, error: null, lastLoad: null };
    }
    case GET_PALETTES_SUCCESS: {
      return {
        ...prev,
        loading: false,
        error: null,
        data: action.refresh ? action.data : { ...prev.data, ...action.data },
        lastLoad: action.lastLoad,
      };
    }
    case GET_PALETTES_FAIL: {
      return {
        ...prev,
        loading: false,
        error: action.error,
        data: {},
        lastLoad: null,
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
  lastLoad: null,
};
