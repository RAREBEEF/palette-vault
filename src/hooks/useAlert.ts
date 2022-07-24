import gsap from "gsap";

const useCopyAlert = (copyAlertRef: any, prevAnimations: Array<any>) => {
  if (!copyAlertRef.current) {
    return;
  }

  const showAlert = () => {
    if (prevAnimations.length !== 0) {
      prevAnimations?.forEach((gsap) => gsap.kill());
      prevAnimations = [];
    }

    const copyAlert = copyAlertRef.current;

    copyAlert.style.bottom = "-40px";

    const appear = gsap.to(copyAlert, 0.3, {
      bottom: "120px",
    });

    const disappear = gsap.to(copyAlert, 0.3, {
      delay: 1.3,
      bottom: "-40px",
    });

    prevAnimations.push(appear, disappear);
  };

  return showAlert;
};

export default useCopyAlert;
