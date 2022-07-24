import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Palette from "../components/Palette";
import { PalettesPropsType, reduxStateType } from "../types";
import styles from "./Palettes.module.scss";

const Palettes: React.FC<PalettesPropsType> = ({
  myPalettesId,
  copyAlertRef,
  setIsCopyFail,
}) => {
  const {
    login: { isLoggedIn },
    palettes: { data: palettes },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  const [tab, setTab] = useState<1 | 2>(1);

  const onFirstTabClick = () => {
    setTab(1);
  };

  const onSecondTabClick = () => {
    setTab(2);
  };

  return (
    <div className={classNames(styles.container, styles.home)}>
      <section className={styles["header-wrapper"]}>
        <h2 className={styles.header}>팔레트 둘러보기</h2>
        <nav className={styles["tab-nav"]}>
          <h3
            onClick={onFirstTabClick}
            className={classNames(
              styles["tab-nav__item"],
              tab === 1 && styles.active
            )}
          >
            전체 팔레트
          </h3>
          <h3
            onClick={onSecondTabClick}
            className={classNames(
              styles["tab-nav__item"],
              tab === 2 && styles.active
            )}
          >
            내 팔레트
          </h3>
        </nav>
      </section>

      <section className={styles.tabs}>
        {tab === 1 && (
          <ul className={styles.palettes}>
            {palettes ? (
              Object.keys(palettes).map((id: string) => (
                <Palette
                  paletteId={id}
                  key={id}
                  copyAlertRef={copyAlertRef}
                  setIsCopyFail={setIsCopyFail}
                />
              ))
            ) : (
              <div className={styles.empty}>
                <p>{`팔레트가 없습니다.\n첫 팔레트를 생성해 보세요.`}</p>
                <Button
                  text={
                    isLoggedIn ? "팔레트 생성하기" : "로그인 후 팔레트 생성하기"
                  }
                  path={isLoggedIn ? "/new" : "/login"}
                />
              </div>
            )}
          </ul>
        )}
        {tab === 2 && (
          <ul className={styles.palettes}>
            {myPalettesId ? (
              myPalettesId.map((id) => (
                <Palette
                  paletteId={id}
                  key={id}
                  copyAlertRef={copyAlertRef}
                  setIsCopyFail={setIsCopyFail}
                />
              ))
            ) : (
              <div className={styles.empty}>
                <p>{`팔레트가 없습니다.\n첫 팔레트를 생성해 보세요.`}</p>
                <Button
                  text={
                    isLoggedIn ? "팔레트 생성하기" : "로그인 후 팔레트 생성하기"
                  }
                  path={isLoggedIn ? "/new" : "/login"}
                />
              </div>
            )}
          </ul>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Palettes;
