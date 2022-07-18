import classNames from "classnames";
import { Link } from "react-router-dom";
import { ButtonPropsType } from "../types";
import styles from "./Button.module.scss";
const Button: React.FC<ButtonPropsType> = ({
  text,
  onClick,
  classes,
  path,
}) => {
  return path ? (
    <Link
      className={classNames(
        styles.btn,
        classes?.map((name: string) => styles[`${name}`])
      )}
      to={path}
    >
      {text}
    </Link>
  ) : (
    <button
      onClick={onClick}
      className={classNames(
        styles.btn,
        classes?.map((name: string) => styles[`${name}`])
      )}
    >
      {text}
    </button>
  );
};

export default Button;
