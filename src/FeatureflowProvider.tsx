import React  from 'react'
import { Provider } from './context'
import {
  FeatureflowReactConfig,
  FeatureflowProviderWithClientConfig,
} from './types'

const FeatureflowProviderWithClient: React.FC<FeatureflowProviderWithClientConfig> = (props) => {
  const { client, children } = props

  const defaultConfig: FeatureflowReactConfig = {
    update: false,
    waitForInit: false,
    preInitComponent: <div></div>
  }
  const config = {
    ...defaultConfig,
    ...props.config
  }

  const providerState = {
    config,
    featureflow: client,
    features: client.getFeatures()
  }

  return <Provider value={providerState}>{children}</Provider>
}
export default FeatureflowProviderWithClient
