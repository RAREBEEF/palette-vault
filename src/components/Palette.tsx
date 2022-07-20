import { useSelector } from "react-redux";
import {
  PalettePropsType,
  reduxLoginStateType,
  reduxStateType,
} from "../types";
import styles from "./Palette.module.scss";
import deleteIcon from "../icons/trash-can-solid.svg";
import React, { useRef, useState } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { firebase } from "../fb";
import gsap from "gsap";

const Palette: React.FC<PalettePropsType> = ({ palette }) => {
  const { userObj } = useSelector(
    (state: reduxStateType): reduxLoginStateType => state.login
  );
  const [copyAlert, setCopyAlert] = useState<string>("");
  const copyAlertRef = useRef<any>(null);
  const [prevGsap, setPrevGsap] = useState<any>(null);

  const onDeletePalette = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const ok = window.confirm("팔레트를 삭제하시겠습니까?");

    if (ok) {
      await deleteDoc(doc(getFirestore(firebase), "palettes", palette.id));
    }
  };

  const onColorClick = (e: React.MouseEvent<HTMLLIElement>, color: string) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(color)
      .then(() => {
        setCopyAlert("복사됨");
        if (copyAlertRef.current) {
          prevGsap?.kill();
          copyAlertRef.current.style.opacity = 1;
          const prev = gsap.to(copyAlertRef.current, 1, {
            delay: 1,
            opacity: 0,
          });
          setPrevGsap(prev);
        }
      })
      .catch((error) => {
        setCopyAlert("복사 실패");
      });
  };

  return (
    <li className={styles.palette}>
      <h3 className={styles["palette-name"]}>{palette.name}</h3>
      <div className={styles["copy-alert"]} ref={copyAlertRef}>
        {copyAlert}
      </div>
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
  );
};

export default Palette;
