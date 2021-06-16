import React from 'react'
import { Consumer } from './context'
import { FeatureflowContext } from './types'

const withFeatureflow = () => {
  return function hoc<P>(WrappedComponent: React.ComponentType<P>) {
    return (props: P) => (
      <Consumer>
        {({ featureflow, features }: FeatureflowContext) => {
          return (
            <WrappedComponent
              featureflow={featureflow}
              features={features}
              {...props}
            />
          )
        }}
      </Consumer>
    )
  }
}

export default withFeatureflow
