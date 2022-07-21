import React, { useState } from "react";
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

const New: React.FC<NewPropsType> = () => {
  const navigate = useNavigate();
  const [colors, setColors] = useState<Array<string>>([]);
  const [colorValue, setColorValue] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { id, displayName } = useSelector(
    (state: reduxStateType): userObjType => state.login.userObj
  );

  const onPaletteNameChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setName(value);
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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (colors.length === 0) {
      window.alert("색상을 1개 이상 추가해 주세요.");
      return;
    } else if (name.length === 0) {
      window.alert("팔레트 이름을 입력해 주세요.");
      return;
    }

    try {
      await addDoc(collection(getFirestore(firebase), "palettes"), {
        colors,
        name,
        createdAt: new Date().getTime(),
        creator: id,
        author: displayName,
      });

      setName("");
      setColors([]);
      navigate("/", { replace: true });
    } catch (error) {
      window.alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const onInitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setColors([]);
    setColorValue("");
    setName("");
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
          value={name}
          onChange={onPaletteNameChange}
          placeholder="팔레트 이름 (1~20 글자)"
          minLength={1}
          maxLength={20}
        />
        <ul className={styles["palette"]}>
          <div className={styles["colors-wrapper"]}>
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
          </div>
        </ul>
      </section>

      <section className={styles.add}>
        <div className={styles["input-wrapper"]}>
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
