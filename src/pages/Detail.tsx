import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { DetailPropsType, paletteType, reduxStateType } from "../types";
import styles from "./Detail.module.scss";
import Button from "../components/Button";
import useDelete from "../hooks/useDelete";
import useCopy from "../hooks/useCopy";
import { useDispatch } from "react-redux";
import { getPaletteThunk } from "../redux/modules/palette";

const Detail: React.FC<DetailPropsType> = ({ copyAlertRef }) => {
  const {
    login: { userObj },
    palettes: { data: palettes },
    palette: { data: singlePaltte },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const deletePalete = useDelete();
  const copy = useCopy(copyAlertRef);
  const [paletteData, setPaletteData] = useState<paletteType | null>(null);

  // id 체크, 복사할 팔레트 state에 저장
  useEffect(() => {
    if (!params.id) {
      return;
    }

    if (!palettes[params.id]) {
      dispatch<any>(getPaletteThunk(params.id));
      setPaletteData(singlePaltte);
    } else {
      setPaletteData(palettes[params.id]);
    }
  }, [dispatch, palettes, params.id, singlePaltte]);

  // 색상 복사
  const onColorClick = (e: React.MouseEvent<HTMLLIElement>, color: string) => {
    e.preventDefault();

    copy(color);
  };

  // 팔레트 삭제
  const onDeletePalette = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const ok = window.confirm("팔레트를 삭제하시겠습니까?");

    if (ok && params.id) {
      deletePalete(params.id);
      navigate("/", { replace: true });
    }
  };

  return paletteData ? (
    <div className={styles.container}>
      <section className={styles["header-wrapper"]}>
        <Link to="/" className={styles["btn--back"]}>
          {`<`} 홈으로
        </Link>
        <h2 className={styles.header}>{paletteData.name}</h2>
      </section>

      <section className={styles.main}>
        {userObj.id === paletteData.creator && (
          <Button
            text="삭제"
            onClick={onDeletePalette}
            classes={["Detail__delete"]}
          />
        )}
        <div className={styles["palette"]}>
          <ul className={styles["colors-wrapper"]}>
            {paletteData.colors.map((color, i) => {
              return (
                <li
                  onClick={(e) => {
                    onColorClick(e, color);
                  }}
                  key={i}
                  className={styles.color}
                  style={{ backgroundColor: color }}
                >
                  <h3 className={styles.name}>{color}</h3>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  ) : (
    <></>
  );
};

export default Detail;
