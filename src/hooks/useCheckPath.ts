import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reduxStateType } from "../types";

const useCheckPath = () => {
  const navigate = useNavigate();
  const {
    login: { isLoggedIn },
    palettes: { data: palettes },
  } = useSelector((state: reduxStateType): reduxStateType => state);

  const toHome = () => {
    navigate("/", { replace: true });
  };
  const toLogin = () => {
    navigate("/", { replace: true });
  };

  const checkPath = (path: string) => {
    if (
      path !== "/" &&
      path !== "/login" &&
      path !== "/profile" &&
      path !== "/new" &&
      path !== "/install" &&
      !/^\/palette\//i.test(path)
    ) {
      toHome();
    } else if (!isLoggedIn && (path === "/new" || path === "/profile")) {
      toLogin();
    } else if (isLoggedIn && path === "/login") {
      toHome();
    } else if (
      /^\/palette\//i.test(path) &&
      !palettes[path.replace(/^\/palette\//i, "")]
    ) {
      toHome();
    } else {
      return;
    }
  };

  return checkPath;
};

export default useCheckPath;
