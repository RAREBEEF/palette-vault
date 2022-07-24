import React, { useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import New from "../pages/New";
import Palettes from "../pages/Palettes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Profile from "../pages/Profile";
import { useDispatch } from "react-redux";
import { login } from "../redux/modules/logIn";
import Login from "../pages/Login";
import { getPalettesThunk } from "../redux/modules/palettes";
import { useSelector } from "react-redux";
import { reduxStateType } from "../types";
import Loading from "./Loading";
import Detail from "../pages/Detail";
import CopyAlert from "./CopyAlert";

function App() {
  const {
    login: { isLoggedIn, userObj },
    palettes: { data: palettes },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  const dispatch = useDispatch();

  // init
  const [init, setInit] = useState<boolean>(false);
  // 내 팔레트 id
  const [myPalettesId, setMyPalettesId] = useState<Array<string>>([]);
  // 복사 실패 여부
  const [isCopyFail, setIsCopyFail] = useState<boolean>(false);
  // 복사 알림 ref
  const copyAlertRef = useRef<any>(null);

  // init
  useEffect(() => {
    if (!init && isLoggedIn !== null && palettes !== null) {
      setInit(true);
    }
  }, [init, isLoggedIn, palettes]);

  // 인증 & 팔레트 가져오기
  useEffect(() => {
    dispatch<any>(getPalettesThunk());

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login.actions.setLogIn({
            isLoggedIn: true,
            userObj: {
              id: user.uid,
              displayName: user.displayName,
            },
          })
        );
      } else {
        dispatch(
          login.actions.setLogIn({
            isLoggedIn: false,
            userObj: { id: "", displayName: "" },
          })
        );
      }
    });
  }, [dispatch]);

  // 내 팔레트만 별도로 저장
  useEffect(() => {
    if (!palettes || !isLoggedIn) {
      return;
    }

    const my = Object.keys(palettes).filter(
      (id: string) => palettes[id].creator === userObj.id
    );

    setMyPalettesId(my);
  }, [isLoggedIn, palettes, userObj.id]);

  return (
    <div className={styles.container}>
      {init ? (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/new" element={<New />} />
            <Route
              path="/profile"
              element={<Profile myPalettesId={myPalettesId} />}
            />
            <Route
              path="/palette/:id"
              element={
                <Detail
                  copyAlertRef={copyAlertRef}
                  setIsCopyFail={setIsCopyFail}
                />
              }
            />
            <Route
              path="/"
              element={
                <Palettes
                  myPalettesId={myPalettesId}
                  copyAlertRef={copyAlertRef}
                  setIsCopyFail={setIsCopyFail}
                />
              }
            />
          </Routes>
          <Nav />
        </Router>
      ) : (
        <Loading />
      )}
      <CopyAlert isFail={isCopyFail} copyAlertRef={copyAlertRef} />
    </div>
  );
}

export default App;
