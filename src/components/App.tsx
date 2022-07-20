import React, { useEffect, useState } from "react";
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
import { paletteType, reduxStateType } from "../types";
import Loading from "./Loading";

function App() {
  const dispatch = useDispatch();
  const [init, setInit] = useState<boolean>(false);
  const {
    login: { isLoggedIn, userObj },
    palettes: { data: palettes },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  const [myPalettes, setMyPalettes] = useState<Array<paletteType>>([]);

  useEffect(() => {
    if (!init && isLoggedIn !== null && palettes !== null) {
      setInit(true);
    }
  }, [init, isLoggedIn, palettes]);

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

  useEffect(() => {
    if (!palettes || !isLoggedIn) {
      return;
    }

    const temp = palettes.filter((palette) => palette.creator === userObj.id);

    setMyPalettes(temp);
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
              element={<Profile myPalettes={myPalettes} />}
            />
            <Route path="/" element={<Palettes myPalettes={myPalettes} />} />
          </Routes>
          <Nav />
        </Router>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
