import { CopyAlertPropsType } from "../types";
import styles from "./CopyAlert.module.scss";

const CopyAlert: React.FC<CopyAlertPropsType> = ({ isFail, copyAlertRef }) => {
  return (
    <div ref={copyAlertRef} className={styles.container}>
      {isFail ? "복사 실패" : "복사됨"}
    </div>
  );
};

export default CopyAlert;
