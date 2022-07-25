const useCheckError = () => {
  const checkError = (code: string) => {
    switch (code) {
      case "auth/wrong-password": {
        return "비밀번호가 올바르지 않습니다.";
      }
      case "auth/user-not-found": {
        return "가입되지 않은 이메일입니다.";
      }
      case "auth/invalid-email": {
        return "올바르지 않은 이메일입니다.";
      }
      case "auth/email-already-in-use": {
        return "이미 사용 중인 이메일입니다.";
      }
      case "auth/requires-recent-login": {
        return `재로그인이 필요한 기능입니다.\n다시 로그인 해주세요.`;
      }
      default: {
        return `오류가 발생했습니다.\n다시 시도해 주세요.`;
      }
    }
  };

  return checkError;
};

export default useCheckError;
