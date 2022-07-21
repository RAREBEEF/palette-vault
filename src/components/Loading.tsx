import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.container}>
      <p className={styles["text--loading"]}>로딩 중</p>
    </div>
  );
};

export default Loading;
