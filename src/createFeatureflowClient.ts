import { FeatureflowClient, FeatureflowClientConfig } from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Featureflow = require('featureflow-client') // until we convert to TS

const createFeatureflowClient = (
  featureflowConfig: FeatureflowClientConfig,
): FeatureflowClient => {
  const featureflow = Featureflow.init(
    featureflowConfig?.apiKey,
    featureflowConfig?.user,
    featureflowConfig
  )
  return featureflow;
}

export default createFeatureflowClient
