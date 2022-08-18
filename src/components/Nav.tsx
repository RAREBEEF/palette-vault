import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";
import logoImg from "../imgs/logo512.png";
import useCheckPath from "../hooks/useCheckPath";
import { NavPropsType } from "../types";

const Nav: React.FC<NavPropsType> = ({ isInstalled }) => {
  const { isLoggedIn } = useSelector((state: any) => state.login);
  const [init, setInit] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const checkPath = useCheckPath();

  // url 체크
  useEffect(() => {
    checkPath(location.pathname);
  }, [checkPath, isLoggedIn, location, navigate]);

  // PWA 체크
  useEffect(() => {
    if (init) {
      return;
    }

    const isStandalone = window.matchMedia(
      "(display-mode: standalone)"
    ).matches;

    if (isStandalone) {
      setIsStandalone(true);
    }

    if (!isInstalled) {
      navigate("/install", { replace: true });
      setInit(true);
    }
  }, [init, isInstalled, navigate]);

  return (
    <nav className={styles.container}>
      <NavLink
        to="/"
        className={({ isActive }: any): string =>
          isActive
            ? classNames(styles.active, styles.item, styles.logo)
            : classNames(styles.item, styles.logo)
        }
      >
        <img
          src={logoImg}
          alt="Palette Vault"
          className={styles["img--logo"]}
        />
      </NavLink>

      <div className={styles["wrapper-not-logo"]}>
        {!isStandalone && (
          <NavLink
            to="/install"
            className={({ isActive }: any): string =>
              isActive
                ? classNames(styles.active, styles.item, styles.install)
                : classNames(styles.item, styles.install)
            }
          >
            설치
          </NavLink>
        )}
        <NavLink
          to={isLoggedIn ? "/new" : "/login"}
          className={({ isActive }: any): string =>
            isActive
              ? classNames(styles.active, styles.item, styles.new)
              : classNames(styles.item, styles.new)
          }
        >
          새 팔레트
        </NavLink>
        <NavLink
          to={isLoggedIn ? "/profile" : "/login"}
          className={({ isActive }: any): string =>
            isActive ? classNames(styles.active, styles.item) : styles.item
          }
        >
          {isLoggedIn ? "프로필" : "로그인"}
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
