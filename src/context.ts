import { createContext } from 'react'
import type {Config, FeatureflowContext, FeatureflowClient} from './types'
import Featureflow, { FeatureflowClient as FeatureflowClientClass } from 'featureflow-client'

export const offlineFeatureflow = async (config?: Config): Promise<FeatureflowClient> => {
  return Featureflow.init('offline', {...config, offline: true});
}

// Create a synchronous offline client for context default using delayInit
// This allows us to create a client instance immediately without awaiting initialization
const createSyncOfflineClient = (config?: Config): FeatureflowClient => {
  // For offline mode, we can instantiate the client directly with delayInit
  // The client will be initialized when needed (e.g., when initialise() is called)
  return new FeatureflowClientClass('offline', undefined, {...config, offline: true, delayInit: true});
}

const context = createContext<FeatureflowContext>({
  features: {},
  featureflow: createSyncOfflineClient()
})

const { Provider, Consumer } = context
export { Provider, Consumer }
export default context
