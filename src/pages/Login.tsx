import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/modules/logIn";
import Button from "../components/Button";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();
  const [formAction, setFormAction] = useState<"login" | "signUp">("signUp");
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  const onEmailChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onDisplayNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDisplayName(value);
  };

  const onPwChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPw(value);
  };

  const onFormChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formAction === "login") {
      setFormAction("signUp");
    } else {
      setFormAction("login");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const auth = getAuth();

    if (formAction === "login") {
      await signInWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          const user = userCredential.user;

          dispatch(
            login.actions.setLogIn({
              isLoggedIn: true,
              userObj: {
                id: user.uid,
                displayName: user.displayName,
              },
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (formAction === "signUp") {
      createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          const user = userCredential.user;

          dispatch(
            login.actions.setLogIn({
              isLoggedIn: true,
              userObj: {
                id: user.uid,
                displayName: user.displayName,
              },
            })
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <input
        type="text"
        value={email}
        onChange={onEmailChange}
        placeholder="이메일"
      />
      {formAction === "signUp" && (
        <input
          type="text"
          value={displayName}
          onChange={onDisplayNameChange}
          placeholder="닉네임"
        />
      )}
      <input
        type="password"
        value={pw}
        onChange={onPwChange}
        placeholder="비밀번호"
      />
      <input type="submit" />
      <Button text="폼체인지" onClick={onFormChange} />
    </form>
  );
};

export default Login;
