import styles from "./LoadingLoadMore.module.scss";

const LoadingLoadMore = () => {
  return (
    <div className={styles.container}>
      <p className={styles["text--loading"]}>로딩 중</p>
    </div>
  );
};

export default LoadingLoadMore;
