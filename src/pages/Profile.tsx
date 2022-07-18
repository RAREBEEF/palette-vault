import { getAuth, updatePassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { login } from "../redux/modules/logIn";
import { reduxStateType } from "../types";
import styles from "./Profile.module.scss";

const Profile = () => {
  const [pw, setPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>();
  const { userObj } = useSelector((state: reduxStateType) => state);
  const dispatch = useDispatch();

  const onDisplayNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setDisplayName(value);
  };

  const onDisplayNameChangeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const user = getAuth().currentUser;

    if (!user) {
      return;
    }

    updateProfile(user, {
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
        setDisplayName("");
      })
      .catch((error) => {
        console.error(error);
      });
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

  const onPwChangeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const user = getAuth().currentUser;

    if (!user || pw !== pwCheck) {
      return;
    }

    updatePassword(user, pw)
      .then(() => {
        console.log("changed");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onDeleteAccountClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const user = getAuth().currentUser;

    const ok = window.confirm("계정을 탈퇴하시겠습니까?");

    if (user && ok) {
      user.delete();
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
        <input
          type="text"
          value={displayName}
          onChange={onDisplayNameChange}
          placeholder={userObj.displayName}
        />
        <Button text="닉네임 변경" onClick={onDisplayNameChangeClick} />
        <Button text="로그아웃" onClick={onLogOutClick} />
        <input type="password" value={pw} onChange={onPwChange} />
        <input type="password" value={pwCheck} onChange={onPwCheckChange} />
        <Button text="비밀번호 변경" onClick={onPwChangeClick} />
        <Button text="계정 탈퇴" onClick={onDeleteAccountClick} />
      </section>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()}. RAREBEEF All Rights Reserved.
      </footer>
    </div>
  );
};

export default Profile;
