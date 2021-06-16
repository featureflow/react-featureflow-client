import * as React from 'react'
import { FeatureflowProviderConfig } from './types'
import FeatureflowProvider from './FeatureflowProvider'

const withFeatureflowProvider = (config: FeatureflowProviderConfig) => {
  return function hoc<P>(WrappedComponent: React.ComponentType<P>) {
    return class extends React.Component<P> {
      render() {
        return (
          <FeatureflowProvider {...config}>
            <WrappedComponent {...this.props} />
          </FeatureflowProvider>
        )
      }
    }
  }
}

export default withFeatureflowProvider
