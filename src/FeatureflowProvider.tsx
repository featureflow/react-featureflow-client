import React  from 'react'
import { Provider } from './context'
import {
  FeatureflowConfig,
  FeatureflowProviderConfig,
} from './types'

const FeatureflowProvider: React.FC<FeatureflowProviderConfig> = (props) => {
  const { client, children } = props

  const defaultConfig: FeatureflowConfig = {
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
export default FeatureflowProvider
