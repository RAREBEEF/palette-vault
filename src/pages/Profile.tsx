import classNames from "classnames";
import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { firebase } from "../fb";
import { login } from "../redux/modules/logIn";
import checkError from "../tools/checkError";
import { ProfilePropsType, reduxStateType } from "../types";
import styles from "./Profile.module.scss";

const Profile: React.FC<ProfilePropsType> = ({ myPalettesId }) => {
  const {
    login: { userObj },
    palettes: { data: palettes },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [alert, setAlert] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");

  const onDisplayNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setDisplayName(value);
  };

  const onDisplayNameChangeClick = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (displayName.length < 2 || displayName.length > 12) {
      setAlert("닉네임은 2 ~ 12글자 범위여야 합니다.");
      return;
    }

    const user = getAuth().currentUser;

    if (!user) {
      return;
    }

    try {
      await updateProfile(user, {
        displayName,
      })
        .then(() => {
          dispatch(
            login.actions.setLogIn({
              isLoggedIn: true,
              userObj: {
                id: user.uid,
                displayName: displayName,
              },
            })
          );
        })
        .then(() => {
          myPalettesId.forEach((id: string) => {
            setDoc(doc(getFirestore(firebase), "palettes", id), {
              ...palettes[id],
              author: displayName,
            });
          });
        });

      setDisplayName("");
      setAlert("닉네임이 변경되었습니다.");
    } catch (error: any) {
      setAlert(checkError(error.code));
    }
  };

  const onLogOutClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const auth = getAuth();
    auth.signOut();
  };

  const onPwChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPw(value);
  };

  const onPwCheckChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setPwCheck(value);
  };

  const onPwChangeClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pw.length < 6 || pw.length > 25) {
      setAlert("비밀번호는 6 ~ 25글자 범위여야 합니다.");
      return;
    } else if (pw !== pwCheck) {
      setAlert("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    const user = getAuth().currentUser;

    if (!user) {
      return;
    }

    updatePassword(user, pw)
      .then(() => {
        setAlert("비밀번호가 변경되었습니다.");
      })
      .catch((error) => {
        setAlert(checkError(error.code));

        setAlert(checkError(error.code));

        if (error.code === "auth/requires-recent-login") {
          const ok = window.confirm(checkError(error.code));

          if (ok) {
            const auth = getAuth();

            auth.signOut().then(() => {
              navigate("/login", { replace: true });
            });
          }
        }
      });
  };

  const onDeleteAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const user = getAuth().currentUser;

    const ok = window.confirm("계정을 탈퇴하시겠습니까?");

    if (user && ok) {
      user.delete().catch((error) => {
        setAlert(checkError(error.code));

        if (error.code === "auth/requires-recent-login") {
          const ok = window.confirm(checkError(error.code));

          if (ok) {
            const auth = getAuth();

            auth.signOut().then(() => {
              navigate("/login", { replace: true });
            });
          }
        }
      });
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles["header-wrapper"]}>
        <Link to="/" className={styles["btn--back"]}>
          {`<`} 홈으로
        </Link>
        <h2 className={styles.header}>프로필 설정</h2>
      </section>

      <section className={styles.main}>
        <p className={styles.alert}>{alert}</p>
        <form
          onSubmit={onDisplayNameChangeClick}
          className={classNames(
            styles["setting--display-name"],
            styles.setting
          )}
        >
          <h2 className={styles["sub-header"]}>닉네임 변경</h2>
          <div className={styles["input-wrapper"]}>
            <input
              type="text"
              value={displayName}
              onChange={onDisplayNameChange}
              placeholder={userObj?.displayName}
            />
            <Button text="닉네임 변경" />
          </div>
        </form>

        <form
          onSubmit={onPwChangeClick}
          className={classNames(styles["setting--pw"], styles.setting)}
        >
          <h2 className={styles["sub-header"]}>비밀번호 변경</h2>
          <div className={styles["input-wrapper"]}>
            <input type="email" autoComplete="email" hidden />
            <input
              type="password"
              value={pw}
              onChange={onPwChange}
              placeholder="새 비밀번호"
              autoComplete="new-password"
            />
            <input
              type="password"
              value={pwCheck}
              onChange={onPwCheckChange}
              placeholder="새 비밀번호 확인"
              autoComplete="new-password"
            />
            <Button text="비밀번호 변경" />
          </div>
        </form>

        <div className={classNames(styles["btn-group"], styles.setting)}>
          <h2 className={styles["sub-header"]}>계정 설정</h2>
          <div className={styles["input-wrapper"]}>
            <Button text="로그아웃" onClick={onLogOutClick} />
            <Button text="계정 탈퇴" onClick={onDeleteAccountClick} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
