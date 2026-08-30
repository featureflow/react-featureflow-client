import FeatureflowProvider from './FeatureflowProvider'
import FeatureflowProviderWithClient from './FeatureflowProviderWithClient'
import asyncFeatureflowProvider from './asyncFeatureflowProvider'
import useFeatureflow from './useFeatureflow'
import useFeatures from './useFeatures'
import useFeature from './useFeature'
import useJsonValue from './useJsonValue'
import useTrack from './useTrack'

export {
  FeatureflowProvider,
  FeatureflowProviderWithClient,
  asyncFeatureflowProvider,
  useFeatureflow,
  useFeatures,
  useFeature,
  useJsonValue,
  useTrack
}

// Analytics integrations: pass through config, e.g.
// { integrations: [amplitudeIntegration(amplitude)] } or
// { integrations: [exposureIntegration(({ key, variant }) => mixpanel.track(...))] }
export { exposureIntegration, amplitudeIntegration } from 'featureflow-client'
export type {
  ExposureSender,
  ExposureIntegrationOptions,
  FlagFilter,
  AmplitudeLike,
  AmplitudeIntegrationOptions
} from 'featureflow-client'

// Re-export SDK types for convenience (all re-exported from types.ts)
export type {
  FeatureflowUser,
  UserAttributes,
  Config,
  EvaluatedFeatures,
  Evaluate,
  Features,
  Feature,
  GoalDetails,
  FeatureflowClient,
  EvaluationDetails,
  EvaluationListener
} from './types'
