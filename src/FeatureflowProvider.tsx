import React, { useEffect, useState } from 'react'
import { Provider } from './context'
import {
  FeatureflowClient,
  FeatureflowClientConfig,
  FeatureflowProviderConfig,
  State
} from './types'
import createFeatureflowClient from './createFeatureflowClient'

const defaultConfig: FeatureflowClientConfig = {
  apiKey: '',
  streaming: false
}
const FeatureflowProvider: React.FC<FeatureflowProviderConfig> = (props) => {
  const { waitForInit, featureflowConfig } = props
  const combinedConfig: FeatureflowClientConfig = {
    ...defaultConfig,
    ...featureflowConfig
  }
  const [state, setState] = useState<State>({
    featureflow: undefined,
    features: {}
  })

  const handleUpdated = (featureflow: FeatureflowClient): void => {
    setState({ ...state, featureflow })
  }

  const initFeatureflow = async (
    featureflowConfig: FeatureflowClientConfig,
    waitForInit: boolean
  ): Promise<FeatureflowClient> => {
    const featureflow = await createFeatureflowClient(
      featureflowConfig,
      waitForInit
    )

    if (featureflowConfig?.streaming) {
      console.log('Handle updated feature ')
      featureflow.on('UPDATED_FEATURE', () => {
        handleUpdated(featureflow)
      })
    }

    console.log('Set state ', featureflow)
    setState({ ...state, featureflow })

    return featureflow
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    // const init = async () => {
    async function init() {
      await initFeatureflow(combinedConfig, waitForInit || true)
    }
    init()

    return function cleanup(): void {
      console.log('clean up featureflow emitters')
      if (state.featureflow) {
        state.featureflow.off('INIT')
        if (featureflowConfig?.streaming) {
          state.featureflow.off('UPDATED_FEATURE')
        }
      }
    }
  }, [])

  return <Provider value={state}>{props.children}</Provider>
}
export default FeatureflowProvider
