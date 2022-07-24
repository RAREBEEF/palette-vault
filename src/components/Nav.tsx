import classNames from "classnames";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";
import logoImg from "../imgs/nav-logo.png";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: any) => state.login);

  useEffect(() => {
    if (
      location.pathname !== "/" &&
      location.pathname !== "/login" &&
      location.pathname !== "/profile" &&
      location.pathname !== "/new" &&
      /^palette\//gi.test(location.pathname)
    ) {
      navigate("/", { replace: true });
    } else if (
      !isLoggedIn &&
      (location.pathname === "/new" || location.pathname === "/profile")
    ) {
      navigate("/login", { replace: true });
    } else if (isLoggedIn && location.pathname === "/login") {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, location.pathname, navigate]);

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
        {/* <h1>PALETTE VAULT</h1> */}
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
          프로필
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
