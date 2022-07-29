import styles from "./LoadingInit.module.scss";
import logoImg from "../imgs/logo512.png";
const LoadingInit = () => {
  return (
    <div className={styles.container}>
      <img src={logoImg} alt="Loading..." className={styles["img--logo"]}/>
    </div>
  );
};

export default LoadingInit;
