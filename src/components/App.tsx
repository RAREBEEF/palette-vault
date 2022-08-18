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
import LoadingInit from "./LoadingInit";
import Detail from "../pages/Detail";
import CopyAlert from "./CopyAlert";
import ToTop from "./ToTop";
import Install from "../pages/Install";

const App = () => {
  const {
    login: { isLoggedIn, userObj },
    palettes: { data: palettes },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  const dispatch = useDispatch();

  const appRef = useRef<HTMLDivElement>(null);

  // beforeinstallprompt
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  // init
  const [init, setInit] = useState<boolean>(false);
  // 내 팔레트 id
  const [myPalettesId, setMyPalettesId] = useState<Array<string>>([]);
  // 복사 알림 ref
  const copyAlertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

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
      setMyPalettesId([]);
      return;
    }

    const my = Object.keys(palettes).filter(
      (id: string) => palettes[id].creator === userObj.id
    );

    setMyPalettesId(my);
  }, [isLoggedIn, palettes, userObj.id]);

  return (
    <div className={styles.container} ref={appRef}>
      {init ? (
        <Router>
          <Routes>
            <Route
              path="/install"
              element={<Install deferredPrompt={deferredPrompt} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/new" element={<New />} />
            <Route
              path="/profile"
              element={<Profile myPalettesId={myPalettesId} />}
            />
            <Route
              path="/palette/:id"
              element={<Detail copyAlertRef={copyAlertRef} />}
            />
            <Route
              path="/*"
              element={
                <Palettes
                  myPalettesId={myPalettesId}
                  copyAlertRef={copyAlertRef}
                />
              }
            />
          </Routes>
          <Nav isInstalled={!deferredPrompt} />
        </Router>
      ) : (
        <LoadingInit />
      )}
      <CopyAlert copyAlertRef={copyAlertRef} />
      <ToTop />
    </div>
  );
};

export default App;
