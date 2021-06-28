import { useContext } from "react";
import context from "./context";

const useFeatures = () => {
  const { features } = useContext(context);
  return features;
};

export default useFeatures;
