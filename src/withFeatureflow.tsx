import React from 'react'
import { Consumer } from './context'
import { FeatureflowContext, FeatureflowReactConfig } from './types'

const withFeatureflow = (config?: FeatureflowReactConfig) => {
  return function hoc<P, C>(WrappedComponent: React.ComponentType<P>) {
    type Props = JSX.LibraryManagedAttributes<C, Omit<P,  "featureflow"|"features">>;
    return (props: Props) => (
      <Consumer>
        {({ featureflow, features, config: contextConfig }: FeatureflowContext) => {
          const combinedConfig: FeatureflowReactConfig = {
            ...contextConfig,
            ...config
          }

          const injectedProps = {
            featureflow,
            features
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
