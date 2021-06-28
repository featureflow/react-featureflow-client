import {useContext, useState} from "react";
import context from "./context";
import {Evaluate, EvaluateSet} from "./types";

const useFeatureflow = () => {
  const { featureflow } = useContext(context);
  const [cache, setCache] = useState<EvaluateSet>({});

  const evaluate = (feature: string): Evaluate => {
    if (cache[feature] === undefined) {
      const evaluatedFeature = featureflow.evaluate(feature);
      setCache({...cache, ...{[feature]: evaluatedFeature}});
      return evaluatedFeature;
    } else {
      return cache[feature]
    }
  }

  return {
    ...featureflow,
    evaluate
  };
};

export default useFeatureflow;
