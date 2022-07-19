import classNames from "classnames";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { PalettesPropsType, paletteType, reduxStateType } from "../types";
import styles from "./Palettes.module.scss";

const Palettes: React.FC<PalettesPropsType> = () => {
  const { login, palettes: palettesArr } = useSelector(
    (state: reduxStateType): reduxStateType => state
  );
  const { data: palettes } = palettesArr;
  const { userObj } = login;
  const [myPalettes, setMyPalettes] = useState<Array<paletteType>>([]);
  const [tab, setTab] = useState<1 | 2>(1);

  const onFirstTabClick = () => {
    setTab(1);
  };

  const onSecondTabClick = () => {
    setTab(2);
  };

  useEffect(() => {
    const temp = palettes.filter((palette) => palette.creator === userObj.id);
    setMyPalettes(temp);
  }, [palettes, userObj.id]);

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
            {palettes.length !== 0 ? (
              palettes.map((palette) => (
                <li key={palette.id} className={styles.palette}>
                  <h3 className={styles["palette-name"]}>{palette.name}</h3>
                  <ul className={styles["colors-wrapper"]}>
                    {palette.colors.map((color, i) => (
                      <li
                        className={styles.color}
                        key={i}
                        style={{ backgroundColor: color }}
                      >
                        <h4 className={styles["color-name"]}>{color}</h4>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <div className={styles.empty}>
                <p>{`팔레트가 없습니다.\n첫 팔레트를 생성해 보세요.`}</p>
                <Button text="팔레트 생성하기" path="/new" />
              </div>
            )}
          </ul>
        )}
        {tab === 2 && (
          <ul className={styles.palettes}>
            {myPalettes.length !== 0 ? (
              myPalettes.map((palette) => (
                <li key={palette.id} className={styles.palette}>
                  <h3 className={styles["palette-name"]}>{palette.name}</h3>
                  <ul className={styles["colors-wrapper"]}>
                    {palette.colors.map((color, i) => (
                      <li
                        className={styles.color}
                        key={i}
                        style={{ backgroundColor: color }}
                      >
                        <h4 className={styles["color-name"]}>{color}</h4>
                      </li>
                    ))}
                  </ul>
                </li>
              ))
            ) : (
              <div className={styles.empty}>
                <p>{`팔레트가 없습니다.\n첫 팔레트를 생성해 보세요.`}</p>
                <Button text="팔레트 생성하기" path="/new" />
              </div>
            )}
          </ul>
        )}
      </section>
      <footer className={styles.footer}>
        &copy; {new Date().getFullYear()}. RAREBEEF All Rights Reserved.
      </footer>
    </div>
  );
};

export default Palettes;
