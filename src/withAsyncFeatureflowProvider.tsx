import React, {FunctionComponent, useEffect, useState} from 'react'
import { Provider } from './context'
import {
  AsyncFeatureflowProviderConfig, EvaluatedFeatureSet, FeatureflowClient,
} from './types'
import createFeatureflowClient from "./createFeatureflowClient";

export default async function withAsyncFeatureflowProvider(configuration: AsyncFeatureflowProviderConfig) {
  const { apiKey, user, config } = configuration;
  const featureflow = await createFeatureflowClient(apiKey, config, user);

  const FeatureflowProvider: FunctionComponent = ({ children }) => {
    interface State {
      features: EvaluatedFeatureSet,
      featureflow: FeatureflowClient
    }
    const [featureflowState, setFeatureflowState] = useState<State>({
      features: featureflow.getFeatures(),
      featureflow,
    });

    useEffect(() => {
      featureflow.on('INIT', () => {
        const newFeatures: EvaluatedFeatureSet = featureflow.getFeatures();
        if (Object.keys(newFeatures).length > 0) {
          setFeatureflowState((prevState) => ({...prevState, features: { ...prevState.features, ...newFeatures}}));
        }
      });
      featureflow.on('UPDATED_FEATURE', (item: any) => {
        console.log('UPDATED_FEATURE', item);
        const newFeatures: EvaluatedFeatureSet = featureflow.getFeatures();
        if (Object.keys(newFeatures).length > 0) {
          setFeatureflowState((prevState) => ({...prevState, features: { ...prevState.features, ...newFeatures}}));
        }
      });
    }, []);

    return <Provider value={featureflowState}>{children}</Provider>;
  };

  return FeatureflowProvider;
}
