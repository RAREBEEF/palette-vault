import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/modules/logIn";
import Button from "../components/Button";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import useCheckError from "../hooks/useCheckError";

const Login = () => {
  const [formAction, setFormAction] = useState<"login" | "signUp" | "pwReset">(
    "login"
  );
  const dispatch = useDispatch();
  const checkError = useCheckError();

  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [alert, setAlert] = useState<string>("");

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

  const onPwCheckChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPwCheck(value);
  };

  // 회원가입, 로그인 전환
  const onFormChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (formAction === "login") {
      setFormAction("signUp");
    } else {
      setFormAction("login");
    }
  };

  // 비밀번호 재설정 전환
  const onPwResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setFormAction("pwReset");
  };

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const auth = getAuth();

    //
    // 로그인
    if (formAction === "login") {
      if (email.length === 0) {
        setAlert("이메일을 입력해 주세요.");
        return;
      } else if (pw.length === 0) {
        setAlert("비밀번호를 입력해 주세요.");
        return;
      }
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
          setAlert(checkError(error.code));
        });
      //
      // 회원가입
    } else if (formAction === "signUp") {
      if (email.length === 0) {
        setAlert("이메일을 입력해 주세요.");
        return;
      } else if (displayName.length < 2 || displayName.length > 12) {
        setAlert("닉네임은 2 ~ 12 글자 범위여야 합니다.");
        return;
      } else if (pw.length < 6 || pw.length > 25) {
        setAlert("비밀번호는 6 ~ 25 글자 범위여야 합니다.");
        return;
      } else if (pw !== pwCheck) {
        setAlert("비밀번호 확인이 일치하지 않습니다.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, pw)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName,
          }).then(() => {
            dispatch(
              login.actions.setLogIn({
                isLoggedIn: true,
                userObj: {
                  id: user.uid,
                  displayName: user.displayName,
                },
              })
            );
          });
        })
        .catch((error) => {
          window.confirm(checkError(error.code));
        });
      //
      // 비밀번호 재설정
    } else if (formAction === "pwReset") {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setAlert("재설정 메일이 발송되었습니다.");
        })
        .catch((error) => {
          setAlert("메일 발송에 실패했습니다. 다시 시도해 주세요.");
        });
    }
  };

  const onGoogleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className={styles.container}>
      <section className={styles["header-wrapper"]}>
        <Link to="/" className={styles["btn--back"]}>
          {`<`} 홈으로
        </Link>
        <h2 className={styles.header}>
          {formAction === "login" ? "로그인" : "회원가입"}
        </h2>
      </section>

      <form className={styles.main}>
        <input
          className={styles["input--email"]}
          type="text"
          value={email}
          onChange={onEmailChange}
          placeholder="이메일"
          minLength={5}
          autoComplete="email"
        />
        {formAction === "signUp" && (
          <input
            className={styles["input--display-name"]}
            type="text"
            value={displayName}
            onChange={onDisplayNameChange}
            placeholder="닉네임 (2~12 글자)"
            minLength={2}
            maxLength={12}
            autoComplete="username"
          />
        )}
        {formAction !== "pwReset" && (
          <input
            className={styles["input--pw"]}
            type="password"
            value={pw}
            onChange={onPwChange}
            placeholder={
              formAction === "login" ? "비밀번호" : "비밀번호 (6~25 글자)"
            }
            minLength={6}
            maxLength={25}
            autoComplete={
              formAction === "login" ? "current-password" : "new-password"
            }
          />
        )}
        {formAction === "signUp" && (
          <input
            className={styles["input--pw-check"]}
            type="password"
            value={pwCheck}
            onChange={onPwCheckChange}
            placeholder="비밀번호 확인"
            minLength={6}
            maxLength={25}
            autoComplete="new-password"
          />
        )}
        <p className={styles.alert}>{alert}</p>
        <div className={styles["btn-group"]}>
          <Button
            text={
              formAction === "signUp"
                ? "회원가입"
                : formAction === "pwReset"
                ? "재설정 메일 발송"
                : "로그인"
            }
            onClick={onSubmit}
          />
          {formAction === "login" && (
            <Button text="구글 계정으로 로그인" onClick={onGoogleLogin} />
          )}
          <Button
            text={
              formAction === "signUp" || formAction === "pwReset"
                ? "기존 계정으로 로그인"
                : "회원가입하기"
            }
            onClick={onFormChange}
            classes={["Login__form-changer"]}
          />
          {formAction === "login" && (
            <Button
              text="비밀번호 재설정"
              onClick={onPwResetClick}
              classes={["Login__form-changer"]}
            />
          )}
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default Login;
