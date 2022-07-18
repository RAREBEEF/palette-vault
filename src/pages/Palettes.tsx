import classNames from "classnames";
import { useState } from "react";
import Button from "../components/Button";
import { PalettesPropsType } from "../types";
import styles from "./Palettes.module.scss";

const Palettes: React.FC<PalettesPropsType> = ({ palettes }) => {
  const [tab, setTab] = useState<1 | 2>(1);

  const onFirstTabClick = () => {
    setTab(1);
  };

  const onSecondTabClick = () => {
    setTab(2);
  };

  return (
    <div className={classNames(styles.container, styles.home)}>
      <h2 className={styles.header}>팔레트 둘러보기</h2>
      <nav className={styles["tab-nav"]}>
        <span
          onClick={onFirstTabClick}
          className={classNames(
            styles["tab-nav__item"],
            tab === 1 && styles.active
          )}
        >
          전체 팔레트
        </span>
        <span
          onClick={onSecondTabClick}
          className={classNames(
            styles["tab-nav__item"],
            tab === 2 && styles.active
          )}
        >
          내 팔레트
        </span>
      </nav>
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
          {[].length !== 0 ? (
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
    </div>
  );
};

export default Palettes;
