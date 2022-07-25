import classNames from "classnames";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Palette from "../components/Palette";
import { getPalettesThunk } from "../redux/modules/palettes";
import { PalettesPropsType, reduxStateType } from "../types";
import styles from "./Palettes.module.scss";

const Palettes: React.FC<PalettesPropsType> = ({
  myPalettesId,
  copyAlertRef,
  setIsCopyFail,
}) => {
  const {
    login: { isLoggedIn },
    palettes: { data: palettes, lastLoad, loading },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  const dispatch = useDispatch();

  // 모든 팔레트, 내 팔레트 구분
  const [tab, setTab] = useState<1 | 2>(1);

  const [searchText, setSearchText] = useState<string>("");

  const onFirstTabClick = () => {
    setTab(1);
  };

  const onSecondTabClick = () => {
    setTab(2);
  };

  const onSearchTextChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchText(value);
  };

  const onLoadMoreClick = () => {
    dispatch<any>(getPalettesThunk(lastLoad));
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
        {(tab === 1 || (tab === 2 && myPalettesId.length !== 0)) && (
          <input
            type="text"
            className={styles.search}
            placeholder="검색"
            onChange={onSearchTextChange}
            value={searchText}
          />
        )}

        {tab === 1 && (
          <ul className={styles.palettes}>
            {palettes ? (
              Object.keys(palettes).map((id: string) => {
                if (searchText.length === 0) {
                  return (
                    <Palette
                      paletteId={id}
                      key={id}
                      copyAlertRef={copyAlertRef}
                      setIsCopyFail={setIsCopyFail}
                    />
                  );
                } else {
                  const regexp = new RegExp(searchText, "gi");
                  if (
                    regexp.test(palettes[id].name) ||
                    regexp.test(palettes[id].author)
                  ) {
                    return (
                      <Palette
                        paletteId={id}
                        key={id}
                        copyAlertRef={copyAlertRef}
                        setIsCopyFail={setIsCopyFail}
                      />
                    );
                  } else {
                    return null;
                  }
                }
              })
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
            {myPalettesId.length !== 0 ? (
              myPalettesId.map((id) => {
                if (searchText.length === 0) {
                  return (
                    <Palette
                      paletteId={id}
                      key={id}
                      copyAlertRef={copyAlertRef}
                      setIsCopyFail={setIsCopyFail}
                    />
                  );
                } else {
                  const regexp = new RegExp(searchText, "gi");
                  if (
                    regexp.test(palettes[id].name) ||
                    regexp.test(palettes[id].author)
                  ) {
                    return (
                      <Palette
                        paletteId={id}
                        key={id}
                        copyAlertRef={copyAlertRef}
                        setIsCopyFail={setIsCopyFail}
                      />
                    );
                  } else {
                    return null;
                  }
                }
              })
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
        {(tab === 1 || (tab === 2 && myPalettesId.length !== 0)) && (
          <section className={styles["load-more"]}>
            {loading ? (
              <Loading />
            ) : (
              <Button
                text="더보기"
                onClick={onLoadMoreClick}
                classes={["Palettes__load-more"]}
              />
            )}
          </section>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Palettes;
