import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { firebase } from "../fb";
import { getPalettesThunk } from "../redux/modules/palettes";
import useCheckError from "./useCheckError";
import { reduxStateType } from "../types";

const useDelete = () => {
  const lastLoad = useSelector(
    (state: reduxStateType) => state.palettes.lastLoad
  );

  const dispatch = useDispatch();
  const checkError = useCheckError();

  const deletePalete = async (id: string) => {
    const ok = window.confirm("팔레트를 삭제하시겠습니까?");

    if (ok) {
      await deleteDoc(doc(getFirestore(firebase), "palettes", id))
        .then(() => {
          dispatch<any>(getPalettesThunk(lastLoad, true));
        })
        .catch((error) => {
          window.alert(checkError(error.code));
        });
    }
  };

  return deletePalete;
};

export default useDelete;
