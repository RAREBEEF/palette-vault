import { useSelector } from "react-redux";
import { PalettePropsType, paletteType, reduxStateType } from "../types";
import styles from "./Palette.module.scss";
import deleteIcon from "../icons/trash-can-solid.svg";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCopyAlert from "../hooks/useAlert";
import useDelete from "../hooks/useDelete";

const Palette: React.FC<PalettePropsType> = ({
  paletteId,
  copyAlertRef,
  setIsCopyFail,
}) => {
  const {
    login: { userObj },
    palettes: { data: palettes },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  const deletePalete = useDelete();

  // 출력할 팔레트
  const [palette, setPalette] = useState<paletteType>();

  // 복사 알림
  let prevAnimations: Array<any> = [];
  const showAlert = useCopyAlert(copyAlertRef, prevAnimations);

  // 출력할 팔레트 정보를 state에 저장
  useEffect(() => {
    setPalette(palettes[paletteId]);
  }, [paletteId, palettes]);

  // 색상 복사
  const onColorClick = (e: React.MouseEvent<HTMLLIElement>, color: string) => {
    e.preventDefault();
    setIsCopyFail(false);

    navigator.clipboard
      .writeText(color)
      .then(() => {
        showAlert && showAlert();
      })
      .catch((error) => {
        setIsCopyFail(true);
      });
  };

  // 팔레트 삭제
  const onDeletePalette = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    deletePalete(paletteId);
  };

  return palette ? (
    <li className={styles.palette}>
      <Link to={`/palette/${paletteId}`}>
        <h3 className={styles["palette-name"]}>{palette.name}</h3>
      </Link>

      {palette.creator === userObj.id && (
        <button className={styles["btn--delete"]} onClick={onDeletePalette}>
          <img
            className={styles["icon--delete"]}
            src={deleteIcon}
            alt="Delete"
          />
        </button>
      )}
      <ul className={styles["colors-wrapper"]}>
        {palette.colors.map((color, i) => (
          <li
            className={styles.color}
            key={i}
            style={{ backgroundColor: color }}
            onClick={(e: React.MouseEvent<HTMLLIElement>) => {
              onColorClick(e, color);
            }}
          >
            <h4 className={styles["color-name"]}>{color}</h4>
          </li>
        ))}
      </ul>
      <span className={styles.author}>By {palette.author}</span>
    </li>
  ) : (
    <></>
  );
};

export default Palette;
