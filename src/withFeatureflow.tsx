import React from 'react'
import { Consumer } from './context'
import {Evaluate, EvaluateSet, FeatureflowContext, FeatureflowReactConfig} from './types'

const withFeatureflow = (config?: FeatureflowReactConfig) => {
  return function hoc<P, C>(WrappedComponent: React.ComponentType<P>) {
    type Props = JSX.LibraryManagedAttributes<C, Omit<P,  "featureflow"|"features">>;
    return (props: Props) => (
      <Consumer>
        {({ featureflow, features, config: contextConfig }: FeatureflowContext) => {
          let cache: EvaluateSet = {};

          const evaluate = (feature: string): Evaluate => {
            if (cache[feature] === undefined) {
              const evaluatedFeature = featureflow.evaluate(feature);
              cache = ({...cache, ...{[feature]: evaluatedFeature}});
              return evaluatedFeature;
            } else {
              return cache[feature]
            }
          }

          const combinedConfig: FeatureflowReactConfig = {
            ...contextConfig,
            ...config
          }

          const memoisedFeatureflow = {
            ...featureflow,
            evaluate
          }

          const injectedProps = {
            featureflow: memoisedFeatureflow,
            features: features
          }
          return (
            !featureflow.hasReceivedInitialResponse() && combinedConfig.waitForInit ? combinedConfig.preInitComponent ||
              <div></div> :
              <WrappedComponent
                {...(props as any)}
                {...injectedProps}
              />
          )
        }}
      </Consumer>
    )
  }
}

export default withFeatureflow
