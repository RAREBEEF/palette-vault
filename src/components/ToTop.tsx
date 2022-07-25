import styles from "./ToTop.module.scss";
import upIcon from "../icons/angles-up-solid.svg";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
const ToTop = () => {
  const [show, setShow] = useState<boolean>(false);

  const onToTopClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const windowScrollListner = () => {
      if (window.scrollY >= window.innerHeight) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", windowScrollListner);

    return () => {
      window.removeEventListener("scroll", windowScrollListner);
    };
  }, []);

  return (
    <div
      className={classNames(styles.container, show && styles.show)}
      onClick={onToTopClick}
    >
      <img src={upIcon} alt="To top" className={styles["icon--up"]} />
    </div>
  );
};

export default ToTop;
