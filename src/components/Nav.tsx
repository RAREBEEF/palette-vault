import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";
import logoImg from "../imgs/logo512.png";
import homeIcon from "../icons/home-solid.svg";
import addIcon from "../icons/add-solid.svg";
import loginIcon from "../icons/login-solid.svg";
import profileIcon from "../icons/profile-solid.svg";
import useCheckPath from "../hooks/useCheckPath";
import { NavPropsType } from "../types";
import useCheckBrowser from "../hooks/useCheckBrowser";

const Nav: React.FC<NavPropsType> = ({ isInstalled }) => {
  const checkBrowser = useCheckBrowser();
  const { isLoggedIn } = useSelector((state: any) => state.login);
  const [init, setInit] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [showInstall, setShowInstall] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const checkPath = useCheckPath();

  // url 체크
  useEffect(() => {
    checkPath(location.pathname);
  }, [checkPath, isLoggedIn, location, navigate]);

  // 앱 설치가 감지되면 설치 버튼 숨기고 홈으로 이동
  useEffect(() => {
    const appinstalledListner = () => {
      setShowInstall(false);
      navigate("/", { replace: true });
    };

    window.addEventListener("appinstalled", appinstalledListner);

    return () => {
      window.removeEventListener("appinstalled", appinstalledListner);
    };
  }, [navigate]);

  // PWA 체크
  useEffect(() => {
    if (init) {
      return;
    }

    const standalone = window.matchMedia("(display-mode: standalone)").matches;

    if (standalone) {
      setIsStandalone(true);
    }

    // beforeinstallprompt를 지원하지 않는 브라우저의 경우
    // 스탠드얼론으로 실행되지 않았을 경우 설치 버튼을 출력
    const browser = checkBrowser(window.navigator.userAgent);

    if (["Firefox", "Safari", "Internet Explorer"].indexOf(browser) !== -1) {
      if (!standalone) {
        setShowInstall(true);
      }

      return;
    }

    setInit(true);
  }, [checkBrowser, init, isInstalled, navigate]);

  return isStandalone ? (
    <nav className={classNames(styles.container, styles.standalone)}>
      <NavLink
        to="/"
        className={({ isActive }: any): string =>
          isActive ? classNames(styles.active, styles.item) : styles.item
        }
      >
        <div className={styles["item-inner-wraper"]}>
          <img className={styles.icon} src={homeIcon} alt="Home" />
          <h4 className={styles["item-text"]}>홈</h4>
        </div>
      </NavLink>
      <NavLink
        to={isLoggedIn ? "/new" : "/login"}
        className={({ isActive }: any): string =>
          isLoggedIn
            ? isActive
              ? classNames(styles.active, styles.item, styles.new)
              : classNames(styles.item, styles.new)
            : classNames(styles.item, styles.new)
        }
      >
        <div className={styles["item-inner-wraper"]}>
          <img className={styles.icon} src={addIcon} alt="New" />
          <h4 className={styles["item-text"]}>새 팔레트</h4>
        </div>
      </NavLink>
      <NavLink
        to={isLoggedIn ? "/profile" : "/login"}
        className={({ isActive }: any): string =>
          isActive
            ? classNames(styles.active, styles.item, styles.login)
            : classNames(styles.item, styles.login)
        }
      >
        {isLoggedIn ? (
          <div className={styles["item-inner-wraper"]}>
            <img className={styles.icon} src={profileIcon} alt="Profile" />
            <h4 className={styles["item-text"]}>프로필</h4>
          </div>
        ) : (
          <div className={styles["item-inner-wraper"]}>
            <img className={styles.icon} src={loginIcon} alt="Login" />
            <h4 className={styles["item-text"]}>로그인</h4>
          </div>
        )}
      </NavLink>
    </nav>
  ) : (
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
        {showInstall && (
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
            isLoggedIn
              ? isActive
                ? classNames(styles.active, styles.item, styles.new)
                : classNames(styles.item, styles.new)
              : classNames(styles.item, styles.new)
          }
        >
          새 팔레트
        </NavLink>
        <NavLink
          to={isLoggedIn ? "/profile" : "/login"}
          className={({ isActive }: any): string =>
            isActive
              ? classNames(styles.active, styles.item, styles.login)
              : classNames(styles.item, styles.login)
          }
        >
          {isLoggedIn ? "프로필" : "로그인"}
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
