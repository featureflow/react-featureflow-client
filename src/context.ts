import { createContext } from 'react'
import { FeatureflowContext } from './types'

const context = createContext<FeatureflowContext>({
  featureflow: undefined,
  features: {}
})
const { Provider, Consumer } = context
export { Provider, Consumer }
export default context
