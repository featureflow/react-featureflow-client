import type {FeatureflowClient, Config, FeatureflowUser} from './types'
import Featureflow from 'featureflow-client'

const createFeatureflowClient = async (
  apiKey: string,
  featureflowConfig: Config,
  user?: FeatureflowUser,
): Promise<FeatureflowClient> => {
  if (user) {
    return Featureflow.init(
      apiKey,
      user,
      featureflowConfig
    )
  }
  return Featureflow.init(
    apiKey,
    featureflowConfig
  )  
}

export default createFeatureflowClient
