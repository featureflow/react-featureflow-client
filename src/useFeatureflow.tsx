import {useContext, useState} from "react";
import context from "./context";
import {Evaluate, EvaluatedFeatureSet, EvaluateSet} from "./types";

const useFeatureflow = () => {
  const { featureflow } = useContext(context);
  const [cache, setCache] = useState<EvaluateSet>({});

  //we need to clear this cache on update
  const evaluate = (feature: string): Evaluate => {
    if (cache[feature] === undefined) {
      const evaluatedFeature = featureflow.evaluate(feature);
      setCache({...cache, ...{[feature]: evaluatedFeature}});
      return evaluatedFeature;
    } else {
      return cache[feature]
    }
  }

  featureflow.on('UPDATED_FEATURE', (item: any) => {
    console.log('UPDATED_FEATURE', item);
    const newFeatures: EvaluatedFeatureSet = featureflow.getFeatures();
    if (Object.keys(newFeatures).length > 0) {
      setCache(({features}) => ({features: { ...features, ...newFeatures}}));
    }
  });

  return {
    ...featureflow,
    evaluate
  };
};

export default useFeatureflow;
