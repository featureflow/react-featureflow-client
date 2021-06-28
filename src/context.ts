import { createContext } from 'react'
import {FeatureflowClientConfig, FeatureflowContext} from './types'
const Featureflow = require('featureflow-client') // until we convert to TS

export const offlineFeatureflow = (config?: FeatureflowClientConfig) => {
  return Featureflow.init('offline', undefined, {...config, offline: true});
}
const context = createContext<FeatureflowContext>({
  features: {},
  featureflow: offlineFeatureflow()
})

const { Provider, Consumer } = context
export { Provider, Consumer }
export default context
