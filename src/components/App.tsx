import React, { useEffect, useState } from "react";
import { paletteType, reduxStateType } from "../types";
import styles from "./App.module.scss";
import New from "../pages/New";
import Palettes from "../pages/Palettes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase } from "../fb";
import Profile from "../pages/Profile";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/modules/getAuth";
import { useSelector } from "react-redux";
import Login from "./Login";

function App() {
  const [palettes, setPalettes] = useState<Array<paletteType>>([]);
  const dispatch = useDispatch();
  const { isLogin, userObj } = useSelector((state: reduxStateType) => state);

  useEffect(() => {
    console.log(isLogin, userObj);
  }, [isLogin, userObj]);

  useEffect(() => {
    const getData = localStorage.getItem("palettes");

    if (!getData) {
      setPalettes([]);
      return;
    }

    const parseData = JSON.parse(getData);

    setPalettes(parseData);
  }, []);

  useEffect(() => {
    console.log(firebase);

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setLogin(true, {
            displayName: user.displayName,
            id: user.uid,
          })
        );
      } else {
        dispatch(setLogin(false, {}));
      }
    });
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<New setPalettes={setPalettes} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Palettes palettes={palettes} />} />
        </Routes>
        <Nav />
      </Router>
    </div>
  );
}

export default App;
