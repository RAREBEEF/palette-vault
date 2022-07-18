import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";

const Profile = () => {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles["btn--back"]}>
        {`<`} 홈으로
      </Link>
      <h2 className={styles.header}>프로필 설정</h2>
      <section></section>
    </div>
  );
};

export default Profile;
