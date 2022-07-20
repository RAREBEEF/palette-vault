import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <p className={styles["text--loading"]}>Loading</p>
    </div>
  );
};

export default Loading;
