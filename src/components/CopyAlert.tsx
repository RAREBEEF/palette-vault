import { CopyAlertPropsType } from "../types";
import styles from "./CopyAlert.module.scss";

const CopyAlert: React.FC<CopyAlertPropsType> = ({ copyAlertRef }) => {
  return (
    <div ref={copyAlertRef} className={styles.container}>
      복사됨
    </div>
  );
};

export default CopyAlert;
