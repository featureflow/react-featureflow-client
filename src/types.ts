import type { ReactNode, Component } from 'react'
// Import SDK types for use in React-specific types
import type {
  FeatureflowUser,
  Config,
  EvaluatedFeatures,
  FeatureflowClient
} from 'featureflow-client'

// Re-export all SDK types directly from the SDK
export type {
  FeatureflowUser,
  Config,
  EvaluatedFeatures,
  Evaluate,
  Features,
  Feature,
  UserAttributes,
  GoalDetails,
  FeatureflowClient
} from 'featureflow-client'

/**
 * Contains the configuration available to initialise and provide a featureflow client
 */
export type FeatureflowProviderConfig = {
  apiKey: string
  config?: Config
  user?: FeatureflowUser
  children?: ReactNode
}

/**
 * Contains the configuration for a provider that takes an already-instantiated client
 */
export type FeatureflowProviderWithClientConfig = Omit<
  FeatureflowProviderConfig,
  'apiKey' | 'config' | 'user'
> & {
  /**
   * Your instantiated featureflow client.
   */
  client: FeatureflowClient
}

/**
 * @internal
 * Internal type for the Featureflow context value.
 * Not exported from the public API.
 */
export type FeatureflowContext = {
  features: EvaluatedFeatures
  featureflow: FeatureflowClient
}
