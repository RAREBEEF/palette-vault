import React, { useState } from "react";
import { Link } from "react-router-dom";
import checkColor from "../tools/checkColor";
import { NewPropsType } from "../types";
import Button from "../components/Button";
import styles from "./New.module.scss";
import deleteIcon from "../icons/trash-can-solid.svg";

const New: React.FC<NewPropsType> = ({ setPalettes }) => {
  const [colors, setColors] = useState<Array<string>>([]);
  const [colorValue, setColorValue] = useState<string>("");
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (colors.length === 0 || paletteName.length === 0) {
      return;
    }

    const getData = localStorage.getItem("palettes");
    let prevPalettes;

    if (!getData) {
      prevPalettes = [];
    } else {
      prevPalettes = JSON.parse(getData);
    }

    console.log(prevPalettes, { name: paletteName, colors });

    const newPalettes = [
      ...prevPalettes,
      { name: paletteName, colors, id: Date.now() },
    ];

    localStorage.setItem("palettes", JSON.stringify(newPalettes));
    setPalettes(newPalettes);

    setPaletteName("");
    setColors([]);
  };

  const onInitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setColors([]);
    setColorValue("");
    setPaletteName("");
  };

  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Link to="/" className={styles["btn--back"]}>
        {`<`} 홈으로
      </Link>
      <h2 className={styles.header}>팔레트 생성하기</h2>
      <section>
        <input
          className={styles["input--title"]}
          value={paletteName}
          onChange={onPaletteNameChange}
          placeholder="팔레트 이름"
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

      <div className={styles["submit-wrapper"]}>
        <Button text="팔레트 저장하기" />
        <Button text="초기화" onClick={onInitClick} classes={["New__init"]} />
      </div>
    </form>
  );
};

export default New;
