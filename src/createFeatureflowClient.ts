import { FeatureflowClient, FeatureflowClientConfig } from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Featureflow = require('featureflow-client') // until we convert to TS

const createFeatureflowClient = async (
  featureflowConfig: FeatureflowClientConfig,
  waitForInit: boolean
): Promise<FeatureflowClient> => {
  const featureflow = Featureflow.init(
    featureflowConfig?.apiKey,
    featureflowConfig?.user,
    featureflowConfig
  )
  return new Promise((resolve, reject) => {
    if (!waitForInit) {
      resolve(featureflow)
    }

    featureflow.on('INIT', () => {
      resolve(featureflow)
    })
    featureflow.on('ERROR', (error: string) => {
      reject(error)
    })
  })
}

export default createFeatureflowClient
