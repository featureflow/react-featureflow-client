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
    const wrapped: React.FC<P> = (props) => {

      const {config: contextConfig, featureflow} = useContext(context);
      console.log('featureflow client is: ', featureflow);
      const [evaluated, setEvaluated] = useState<EvaluateSet>({});
      const [features, setFeatures] = useState<EvaluatedFeatureSet>(featureflow.getFeatures());
      const combinedConfig: FeatureflowConfig = {
        ...contextConfig,
        ...config
      }

      useEffect(() => {
        featureflow.on('INIT', () => {
          console.log('useEffect featureflow client is: ', featureflow);
          setFeatures(featureflow.getFeatures())
        });
        if (combinedConfig.update) {
          featureflow.on('UPDATED_FEATURE', () => {

            const handleUpdated = (featureflow: FeatureflowClient): void => {
              setFeatures(featureflow.getFeatures())
            }
            handleUpdated(featureflow)
          })
        }

        return function cleanup(): void {
          console.log('clean up featureflow emitters')
          if (featureflow) {
            featureflow.off('INIT')
            if (combinedConfig.update) {
              featureflow.off('UPDATED_FEATURE')
            }
          }
        }
      }, [])

      const evaluate = (feature: string): Evaluate | undefined => {
        if (evaluated[feature] === undefined) {
          const evaluatedFeature = featureflow.evaluate(feature);
          setEvaluated({...evaluated, ...{[feature]: evaluatedFeature}});
          return evaluatedFeature;
        } else {
          return evaluated[feature]
        }
      }

      const goal = (goalKey: string) => {
        featureflow.goal(goalKey);
      }

      return (
        !featureflow.hasReceivedInitialResponse() && combinedConfig.waitForInit ? combinedConfig.preInitComponent ||
          <div></div> :
          <WrappedComponent
            featureflow={featureflow}
            evaluate={evaluate}
            goal={goal}
            features={features}
            {...props}
          />
      )
    }
    return wrapped;
  }
}

export default withFeatureflow
