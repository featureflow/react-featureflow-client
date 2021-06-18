import React from "react";
import context from "./context";

const useFeatureflow = () => {
  return React.useContext(context);
};

export { useFeatureflow };
