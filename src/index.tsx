import FeatureflowProviderWithClient from './FeatureflowProvider'
import FeatureflowProvider from './provider'
import useFeatureflow from "./useFeatureflow";
import useFeatures from "./useFeatures";
import type { FeatureflowUser, UserAttributes } from './types'

export { FeatureflowProvider, FeatureflowProviderWithClient, useFeatureflow, useFeatures }
export type { FeatureflowUser, UserAttributes }

// Re-export SDK types for convenience
export type {
  Config,
  EvaluatedFeatures,
  Evaluate,
  Features,
  Feature
} from 'featureflow-client'
