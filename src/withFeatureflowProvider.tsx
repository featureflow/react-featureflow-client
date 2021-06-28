import * as React from 'react'
import { AsyncFeatureflowProviderConfig } from './types'
import FeatureflowProvider from "./provider";

export function withFeatureflowProvider(configuration: AsyncFeatureflowProviderConfig) {
  return function withFeatureflowProviderHoc<P>(WrappedComponent: React.ComponentType<P>) {
    const providerProps = { ...configuration };
    return class extends React.Component<P> {
      render() {
        return (
          <FeatureflowProvider {...providerProps}>
            <WrappedComponent {...this.props} />
          </FeatureflowProvider>
        );
      }
    };
  };
}

export default withFeatureflowProvider;
