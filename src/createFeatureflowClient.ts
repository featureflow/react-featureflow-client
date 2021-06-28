import {FeatureflowClient, FeatureflowClientConfig, FeatureflowUser} from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Featureflow = require('featureflow-client') // until we convert to TS

const createFeatureflowClient = (
  apiKey: string,
  featureflowConfig: FeatureflowClientConfig,
  user?: FeatureflowUser,
): FeatureflowClient => {
  const featureflow = Featureflow.init(
    apiKey,
    user,
    featureflowConfig
  )
  return featureflow;
}

export default createFeatureflowClient
