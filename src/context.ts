import { createContext } from 'react'
import { FeatureflowContext } from './types'
const Featureflow = require('featureflow-client') // until we convert to TS

const ff = Featureflow.init('offline', undefined, {offline: true});
const context = createContext<FeatureflowContext>({
  featureflow: ff,
  config: {},
  features: {}
})

const { Provider, Consumer } = context
export { Provider, Consumer }
export default context
