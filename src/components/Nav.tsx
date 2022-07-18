import classNames from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: any) => state);

  useEffect(() => {
    if (
      location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname !== "/profile" &&
      location.pathname !== "/new"
    ) {
      navigate("/", { replace: true });
    } /* else if (
      !isLogin &&
      (location.pathname === "/new" || location.pathname === "/profile")
    ) {
      navigate("/login", { replace: true });
    } else if (isLogin && location.pathname === "/login") {
      navigate("/", { replace: true });
    } */
  }, [isLogin, location.pathname, navigate]);

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
        <h1>COLOR VAULT</h1>
      </NavLink>
      <div className={styles["wrapper-not-logo"]}>
        <NavLink
          to="/new"
          className={({ isActive }: any): string =>
            isActive
              ? classNames(styles.active, styles.item, styles.new)
              : classNames(styles.item, styles.new)
          }
        >
          새 팔레트
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }: any): string =>
            isActive ? classNames(styles.active, styles.item) : styles.item
          }
        >
          프로필
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
