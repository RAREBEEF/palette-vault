import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import checkColor from "../tools/checkColor";
import { NewPropsType, reduxStateType, userObjType } from "../types";
import Button from "../components/Button";
import styles from "./New.module.scss";
import deleteIcon from "../icons/trash-can-solid.svg";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { firebase } from "../fb";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import checkError from "../tools/checkError";

const New: React.FC<NewPropsType> = () => {
  const { id, displayName } = useSelector(
    (state: reduxStateType): userObjType => state.login.userObj
  );
  const navigate = useNavigate();

  // <input type="color" /> ref
  const colorPickerRef = useRef<any>(null);

  // 색상 배열
  const [colors, setColors] = useState<Array<string>>([]);
  // 색상 값
  const [colorValue, setColorValue] = useState<string>("");
  // 팔레트 이름
  const [paletteName, setPaletteName] = useState<string>("");

  const onPaletteNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setPaletteName(value);
  };

  const onColorValueChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setColorValue(value);
  };

  const onAddColor = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const color = checkColor(colorValue);

    if (!color) {
      return;
    } else {
      setColors((prev) => [...prev, color]);
      setColorValue("");
    }
  };

  const onDeleteColor = (e: any, i: number) => {
    e.preventDefault();
    setColors((prev) => {
      const newColors = [...prev];

      newColors.splice(i, 1);

      return newColors;
    });
  };

  const onInitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setColors([]);
    setColorValue("");
    setPaletteName("");
  };

  const onPickColor = () => {
    if (!colorPickerRef.current) {
      return;
    }

    const { value } = colorPickerRef.current;

    setColorValue(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (colors.length === 0) {
      window.alert("색상을 1개 이상 추가해 주세요.");
      return;
    } else if (paletteName.length === 0) {
      window.alert("팔레트 이름을 입력해 주세요.");
      return;
    }

    try {
      await addDoc(collection(getFirestore(firebase), "palettes"), {
        colors,
        name: paletteName,
        createdAt: new Date().getTime(),
        creator: id,
        author: displayName,
      });

      setPaletteName("");
      setColors([]);
      navigate("/", { replace: true });
    } catch (error: any) {
      window.alert(checkError(error.code));
    }
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <section className={styles["header-wrapper"]}>
        <Link to="/" className={styles["btn--back"]}>
          {`<`} 홈으로
        </Link>
        <h2 className={styles.header}>팔레트 생성하기</h2>
      </section>

      <section className={styles.main}>
        <input
          className={styles["input--title"]}
          value={paletteName}
          onChange={onPaletteNameChange}
          placeholder="팔레트 이름 (1~20 글자)"
          minLength={1}
          maxLength={20}
        />
        <div className={styles["palette"]}>
          <ul className={styles["colors-wrapper"]}>
            {colors.length !== 0 ? (
              colors.map((color, i) => {
                return (
                  <li
                    key={i}
                    className={styles.color}
                    style={{ backgroundColor: color }}
                  >
                    <h3 className={styles.name}>{color}</h3>
                    <div
                      className={styles["btn--delete"]}
                      onClick={(e) => {
                        onDeleteColor(e, i);
                      }}
                    >
                      <img
                        className={styles["icon--delete"]}
                        src={deleteIcon}
                        alt="Delete"
                      />
                    </div>
                  </li>
                );
              })
            ) : (
              <div className={styles.empty}>비어있음</div>
            )}
          </ul>
        </div>
      </section>

      <section className={styles.add}>
        <div className={styles["input-wrapper"]}>
          <input
            type="color"
            ref={colorPickerRef}
            onChange={onPickColor}
            className={styles["color-picker"]}
          />
          <input
            className={styles["input--color"]}
            type="text"
            value={colorValue}
            onChange={onColorValueChange}
            placeholder={"#000000 or 0,0,0"}
          />
          <Button text="색상 추가" onClick={onAddColor} />
        </div>
      </section>

      <section className={styles.submit}>
        <Button text="팔레트 저장하기" />
        <Button text="초기화" onClick={onInitClick} classes={["New__init"]} />
      </section>

      <Footer />
    </form>
  );
};

export default New;
