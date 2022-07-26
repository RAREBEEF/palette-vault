import React, { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { value } = e.target;

    setValue(value);
  };

  return { value, onChange, setValue };
};

export default useInput;
