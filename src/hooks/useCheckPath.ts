import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reduxStateType } from "../types";

const useCheckPath = () => {
  const navigate = useNavigate();
  const {
    login: { isLoggedIn },
  } = useSelector((state: reduxStateType): reduxStateType => state);

  const toHome = () => {
    navigate("/", { replace: true });
  };
  const toLogin = () => {
    navigate("/", { replace: true });
  };

  const checkPath = (path: string) => {
    if (!isLoggedIn && (path === "/new" || path === "/profile")) {
      toLogin();
    } else if (isLoggedIn && path === "/login") {
      toHome();
    } else {
      return;
    }
  };

  return checkPath;
};

export default useCheckPath;
