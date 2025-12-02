import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Provider } from './context';
import createFeatureflowClient from './createFeatureflowClient';
import type {
  FeatureflowProviderConfig,
  EvaluatedFeatures,
  FeatureflowContext,
} from './types';

/**
 * This is an async function which initializes Featureflow's JS SDK (`featureflow-client`)
 * and awaits it so all features and the featureflow client are ready before the consumer app is rendered.
 *
 * The difference between `FeatureflowProvider` and `asyncFeatureflowProvider` is that `FeatureflowProvider` 
 * initializes `featureflow-client` in `useEffect` (after mount). This means your features and the client are 
 * only available after your app has mounted. This can result in a flicker due to feature changes at startup time.
 *
 * `asyncFeatureflowProvider` initializes `featureflow-client` at the entry point of your app prior to render.
 * This means that your features and the client are ready at the beginning of your app. This ensures your app 
 * does not flicker due to feature changes at startup time.
 *
 * `asyncFeatureflowProvider` accepts a config object which is used to initialize `featureflow-client`.
 *
 * It returns a provider which is a React FunctionComponent which:
 * - saves all features and the featureflow client instance in the context API
 * - subscribes to feature changes and propagate them through the context API
 *
 * @example
 * ```tsx
 * // At your app entry point (e.g., index.tsx)
 * const initApp = async () => {
 *   const FeatureflowProvider = await asyncFeatureflowProvider({
 *     apiKey: 'your-api-key',
 *     config: { offline: false },
 *     user: { id: 'user-123' }
 *   });
 *   
 *   ReactDOM.render(
 *     <FeatureflowProvider>
 *       <App />
 *     </FeatureflowProvider>,
 *     document.getElementById('root')
 *   );
 * };
 * 
 * initApp();
 * ```
 *
 * @param config - The configuration used to initialize Featureflow's JS SDK
 * @returns A Promise that resolves to a FeatureflowProvider component
 */
export default async function asyncFeatureflowProvider(
  config: Omit<FeatureflowProviderConfig, 'children'>
): Promise<React.ComponentType<{ children: ReactNode }>> {
  const { apiKey, config: featureflowConfig, user } = config;
  
  // Initialize the client and wait for it to be ready
  const featureflow = await createFeatureflowClient(apiKey, featureflowConfig, user);
  
  // Get initial features
  const initialFeatures = featureflow.getFeatures();

  // Return a provider component that already has the initialized client
  const FeatureflowProvider = ({ children }: { children: ReactNode }) => {
    const [featureflowData, setFeatureflowData] = useState<FeatureflowContext>(() => ({
      features: initialFeatures,
      featureflow,
    }));

    useEffect(() => {
      function onInit() {
        const newFeatures: EvaluatedFeatures = featureflow.getFeatures();
        if (Object.keys(newFeatures).length > 0) {
          setFeatureflowData((prevState) => ({
            ...prevState,
            features: { ...prevState.features, ...newFeatures },
          }));
        }
      }

      function onFeatureUpdated() {
        const newFeatures: EvaluatedFeatures = featureflow.getFeatures();
        if (Object.keys(newFeatures).length > 0) {
          setFeatureflowData((prevState) => ({
            ...prevState,
            features: { ...prevState.features, ...newFeatures },
          }));
        }
      }

      // Subscribe to feature changes
      featureflow.on('INIT', onInit);
      featureflow.on('UPDATED_FEATURE', onFeatureUpdated);

      return function cleanup() {
        featureflow.off('INIT');
        featureflow.off('UPDATED_FEATURE');
      };
    }, []);

    return <Provider value={featureflowData}>{children}</Provider>;
  };

  return FeatureflowProvider;
}

