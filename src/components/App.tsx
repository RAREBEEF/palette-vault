import React, { useEffect } from "react";
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

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getPalettesThunk());
  }, [dispatch]);

  useEffect(() => {
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

  return (
    <div className={styles.container}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<New />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Palettes />} />
        </Routes>
        <Nav />
      </Router>
    </div>
  );
}

export default App;
