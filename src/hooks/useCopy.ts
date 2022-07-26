import useCopyAlert from "./useCopyAlert";

const useCopy = (copyAlertRef: any) => {
  const showAlert = useCopyAlert(copyAlertRef);

  const copy = (color: string) => {
    navigator.clipboard
      .writeText(color)
      .then(() => {
        showAlert && showAlert();
      })
      .catch((error) => {
        window.alert(
          "복사 중 오류가 발생하였습니다.\n잠시 후 다시 시도해 주세요."
        );
      });
  };

  return copy;
};

export default useCopy;
