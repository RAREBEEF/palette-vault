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

    // beforeinstallprompt가 안먹히는 safari에서
    // 설치 여부 체크 및 설치 유도를 위해
    // 스탠드얼론이 아닐 경우 설치 버튼 출력
    const standalone = window.matchMedia("(display-mode: standalone)").matches;

    if (!standalone) {
      setShowInstall(true);
    }

    // beforeinstallprompt를 지원하는 크롬의 경우
    // 설치가 되어있을 경우 설치 버튼 숨김
    // 설치가 안되어있을 경우 설치 페이지로 이동
    if (isInstalled) {
      setShowInstall(false);
    } else {
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
