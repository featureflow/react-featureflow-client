import React, {useContext, useEffect, useState} from 'react'
import context from './context'
import {
  Evaluate,
  EvaluatedFeatureSet,
  EvaluateSet,
  FeatureflowClient,
  FeatureflowConfig,
} from './types'

const withFeatureflow = (config?: FeatureflowConfig) => {
  return function hoc<P>(WrappedComponent: React.ComponentType<P>) {
    let cache: EvaluateSet = {};

    const wrapped: React.FC<P> = (props) => {

      const {config: contextConfig, featureflow} = useContext(context);
      const [features, setFeatures] = useState<EvaluatedFeatureSet>(featureflow.getFeatures());
      const combinedConfig: FeatureflowConfig = {
        ...contextConfig,
        ...config
      }

      useEffect(() => {
        featureflow.on('INIT', () => {
          setFeatures(featureflow.getFeatures())
        });
        if (combinedConfig.update) {
          featureflow.on('UPDATED_FEATURE', (item: any) => {
            const handleUpdated = (featureflow: FeatureflowClient): void => {
              if(item){
                Object.keys(item).map(key => delete cache[key]);
              }
              setFeatures(featureflow.getFeatures())
            }
            handleUpdated(featureflow)
          })
        }

        return function cleanup(): void {
          if (featureflow) {
            featureflow.off('INIT')
            if (combinedConfig.update) {
              featureflow.off('UPDATED_FEATURE')
            }
          }
        }
      }, [])

      const evaluate = (feature: string): Evaluate => {
        if (cache[feature] === undefined) {
          const evaluatedFeature = featureflow.evaluate(feature);
          cache = ({...cache, ...{[feature]: evaluatedFeature}});
          return evaluatedFeature;
        } else {
          return cache[feature]
        }
      }

      const memoisedFeatureflow = {
        ...featureflow,
        evaluate
      }

      return (
        !featureflow.hasReceivedInitialResponse() && combinedConfig.waitForInit ? combinedConfig.preInitComponent ||
          <div></div> :
          <WrappedComponent
            featureflow={memoisedFeatureflow}
            features={features}
            {...props}
          />
      )
    }
    return wrapped;
  }
}

export default withFeatureflow
