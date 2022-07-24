import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { DetailPropsType, paletteType, reduxStateType } from "../types";
import styles from "./Detail.module.scss";
import gsap from "gsap";
import Button from "../components/Button";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { firebase } from "../fb";
import checkError from "../tools/checkError";

const Detail: React.FC<DetailPropsType> = ({ copyAlertRef, setIsCopyFail }) => {
  const [palette, setPalette] = useState<paletteType>();
  const navigate = useNavigate();
  const params = useParams();
  const {
    login: { userObj },
    palettes: { data: palettes },
  } = useSelector((state: reduxStateType): reduxStateType => state);
  let prevGsap: Array<any> = [];

  useEffect(() => {
    if (!params.id) {
      return;
    }
    setPalette(palettes[params.id]);
  }, [palettes, params, params.id]);

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

    if (ok && params.id) {
      await deleteDoc(doc(getFirestore(firebase), "palettes", params.id))
        .then(() => {
          navigate("/", { replace: true });
        })
        .catch((error) => {
          window.alert(checkError(error.code));
        });
    }
  };

  return palette ? (
    <div className={styles.container}>
      <section className={styles["header-wrapper"]}>
        <Link to="/" className={styles["btn--back"]}>
          {`<`} 홈으로
        </Link>
        <h2 className={styles.header}>{palette.name}</h2>
      </section>

      <section className={styles.main}>
        {userObj.id === palette.creator && (
          <Button
            text="삭제"
            onClick={onDeletePalette}
            classes={["Detail__delete"]}
          />
        )}
        <div className={styles["palette"]}>
          <ul className={styles["colors-wrapper"]}>
            {palette.colors.map((color, i) => {
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
