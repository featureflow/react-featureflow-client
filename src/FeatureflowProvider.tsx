import React, { useState, useEffect } from 'react'
import { Provider } from './context'
import { FeatureflowClient } from 'featureflow-client'

import type {
  FeatureflowProviderConfig,
  EvaluatedFeatures,
  FeatureflowContext
} from './types'

const FeatureflowProvider: React.FC<FeatureflowProviderConfig> = ({
  apiKey,
  config,
  user,
  children
}) => {
  // Use lazy initializer to create client only once
  const [state, setState] = useState<FeatureflowContext>(() => ({
    features: {},
    featureflow: new FeatureflowClient(apiKey, user, {
      ...(config || {}),
      ...{ initOnCache: true, delayInit: true }
    })
  }))

  useEffect(() => {
    let isMounted = true
    const featureflow = state.featureflow

    const onInit = () => {
      if (!isMounted) return
      const newFeatures: EvaluatedFeatures = featureflow.getFeatures()
      if (Object.keys(newFeatures).length > 0) {
        setState((prevState) => ({
          ...prevState,
          features: { ...prevState.features, ...newFeatures }
        }))
      }
    }

    const onFeatureUpdated = () => {
      if (!isMounted) return
      const newFeatures: EvaluatedFeatures = featureflow.getFeatures()
      if (Object.keys(newFeatures).length > 0) {
        setState((prevState) => ({
          ...prevState,
          features: { ...prevState.features, ...newFeatures }
        }))
      }
    }

    const initialiseFeatureflow = async () => {
      await featureflow.initialise(user)
      if (!isMounted) return

      setState((prevState) => ({
        ...prevState,
        features: featureflow.getFeatures()
      }))

      // Subscribe to feature changes
      featureflow.on('INIT', onInit)
      featureflow.on('UPDATED_FEATURE', onFeatureUpdated)
    }

    initialiseFeatureflow()

    return () => {
      isMounted = false
      featureflow.off('INIT')
      featureflow.off('UPDATED_FEATURE')
    }
  }, [state.featureflow, user])

  return <Provider value={state}>{children}</Provider>
}

export default FeatureflowProvider
