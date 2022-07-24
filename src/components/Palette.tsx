import { useSelector } from "react-redux";
import { PalettePropsType, paletteType, reduxStateType } from "../types";
import styles from "./Palette.module.scss";
import deleteIcon from "../icons/trash-can-solid.svg";
import React, { useEffect, useState } from "react";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { firebase } from "../fb";
import gsap from "gsap";
import { Link } from "react-router-dom";
import checkError from "../tools/checkError";

const Palette: React.FC<PalettePropsType> = ({
  paletteId,
  copyAlertRef,
  setIsCopyFail,
}) => {
  const [palette, setPalette] = useState<paletteType>();
  const {
    login: { userObj },
    palettes: { data: palettes },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  let prevGsap: Array<any> = [];

  useEffect(() => {
    setPalette(palettes[paletteId]);
  }, [paletteId, palettes]);

  const onColorClick = (e: React.MouseEvent<HTMLLIElement>, color: string) => {
    e.preventDefault();
    navigator.clipboard
      .writeText(color)
      .then(() => {
        if (copyAlertRef.current) {
          if (prevGsap.length !== 0) {
            prevGsap?.forEach((gsap) => gsap.kill());
            prevGsap = [];
          }

          const copyAlert = copyAlertRef.current;

          copyAlert.style.bottom = "-40px";

          const appear = gsap.to(copyAlert, 0.3, {
            bottom: "120px",
          });

          const disappear = gsap.to(copyAlert, 0.3, {
            delay: 1.3,
            bottom: "-40px",
          });

          prevGsap.push(appear, disappear);
          setIsCopyFail(false);
        }
      })
      .catch((error) => {
        setIsCopyFail(true);
      });
  };

  const onDeletePalette = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const ok = window.confirm("팔레트를 삭제하시겠습니까?");

    if (ok) {
      await deleteDoc(doc(getFirestore(firebase), "palettes", paletteId)).catch(
        (error) => {
          window.alert(checkError(error.code));
        }
      );
    }
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
