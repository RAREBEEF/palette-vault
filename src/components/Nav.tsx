import classNames from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";
import logoImg from "../imgs/logo512.png";
import useCheckPath from "../hooks/useCheckPath";

const Nav = () => {
  const { isLoggedIn } = useSelector((state: any) => state.login);
  const location = useLocation();
  const navigate = useNavigate();
  const checkPath = useCheckPath();

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      //@ts-ignore
      window.promptEvent = e;
      if (window.matchMedia("(display-mode: standalone)").matches) {
        return;
      } else {
        navigate("/install", { replace: true });
      }
    });
  }, [navigate]);

  // url 체크
  useEffect(() => {
    checkPath(location.pathname);
  }, [checkPath, isLoggedIn, location, navigate]);

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
