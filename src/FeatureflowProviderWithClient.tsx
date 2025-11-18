import React from 'react'
import { Provider } from './context'
import type {
  FeatureflowProviderWithClientConfig,
  FeatureflowContext,
} from './types'

const FeatureflowProviderWithClient: React.FC<FeatureflowProviderWithClientConfig> = (props) => {
  const { client, children } = props

  const providerState: FeatureflowContext = {
    featureflow: client,
    features: client.getFeatures()
  }

  return <Provider value={providerState}>{children}</Provider>
}
export default FeatureflowProviderWithClient

