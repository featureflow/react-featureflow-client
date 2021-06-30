import { useContext } from "react";
import context from "./context";

const useFeatureflow = () => {
  const { featureflow } = useContext(context);

  return featureflow;
};

export default useFeatureflow;
