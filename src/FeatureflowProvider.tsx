import React, { useState, useEffect } from 'react';
import { Provider } from './context';
import { FeatureflowClient as FeatureflowClientClass } from 'featureflow-client';

import createFeatureflowClient from "./createFeatureflowClient";
import type {
  FeatureflowProviderConfig,
  EvaluatedFeatures,
  FeatureflowClient,
  FeatureflowContext,
} from "./types";

const FeatureflowProvider: React.FC<FeatureflowProviderConfig> = ({ apiKey, config, user, children }) => {
  // Create a synchronous offline client for initial state
  const offlineClient = new FeatureflowClientClass('offline', undefined, {
    ...config || {},
    offline: true,
    delayInit: true
  });

  const [state, setState] = useState<FeatureflowContext>({
    features: {},
    featureflow: offlineClient,
  });

  useEffect(() => {
    let isMounted = true;

    const initialiseFeatureflow = async () => {
      const featureflow = await createFeatureflowClient(apiKey, config, user);
      
      if (!isMounted) return;

      setState({
        features: featureflow.getFeatures(),
        featureflow,
      });

      const subscribeToChanges = (featureflow: FeatureflowClient) => {
        featureflow.on('INIT', () => {
          const newFeatures: EvaluatedFeatures = featureflow.getFeatures();
          if (Object.keys(newFeatures).length > 0) {
            setState((prevState) => ({
              ...prevState,
              features: { ...prevState.features, ...newFeatures }
            }));
          }
        });
        featureflow.on('UPDATED_FEATURE', (item: unknown) => {
          console.log('UPDATED_FEATURE', item);
          const newFeatures: EvaluatedFeatures = featureflow.getFeatures();
          if (Object.keys(newFeatures).length > 0) {
            setState((prevState) => ({
              ...prevState,
              features: { ...prevState.features, ...newFeatures }
            }));
          }
        });
      };

      subscribeToChanges(featureflow);
    };

    initialiseFeatureflow();

    return () => {
      isMounted = false;
    };
  }, [apiKey, config, user]);

  return <Provider value={state}>{children}</Provider>;
};

export default FeatureflowProvider;
