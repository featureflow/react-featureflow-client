import type {ReactNode, ReactElement, Component} from "react";
// Import SDK types for use in React-specific types
import type {
  FeatureflowUser,
  Config,
  EvaluatedFeatures,
  Evaluate,
  Features,
  Feature,
  UserAttributes
} from 'featureflow-client';

// Re-export all SDK types directly from the SDK
export type {
  FeatureflowUser,
  Config,
  EvaluatedFeatures,
  Evaluate,
  Features,
  Feature,
  UserAttributes
} from 'featureflow-client';

// React-specific types that extend or wrap SDK types
export interface FeatureflowClient {
  on(event: string, callback: (...args: unknown[]) => void): void
  off(event: string): void
  getFeatures(): EvaluatedFeatures
  evaluate(feature: string): Evaluate
  goal(goalKey: string): void
  updateUser(user: FeatureflowUser): void
  hasReceivedInitialResponse(): boolean
}

/**
 * Contains the configuration available to initialise and provide a featureflow client
 */
export interface FeatureflowProviderConfig {
  apiKey: string
  config: Config,
  user?: FeatureflowUser
}

/**
 * Contains the configuration for a provider that takes an already-instantiated client
 */
export interface FeatureflowProviderWithClientConfig {
  config?: FeatureflowReactConfig
  /**
   * Your instantiated featureflow client.
   */
  client: FeatureflowClient
  children?: ReactNode
}

/**
 * A set of pre-evaluated feature evaluate objects
 */
export interface EvaluateSet {
  [key: string]: Evaluate
}

export interface FeatureflowContext {
  config?: FeatureflowReactConfig
  features: EvaluatedFeatures
  featureflow: FeatureflowClient
}

/**
 * Configuration to be passed to the FeatureflowProvider
 * Passing to the FeatureflowProvider sets the 'defaults' for each consumer
 */
export interface FeatureflowReactConfig {
  update?: boolean,
  waitForInit?: boolean,
  preInitComponent?: ReactElement
  children?: ReactNode
}

export interface State {
  config: FeatureflowReactConfig
  features: EvaluatedFeatures
  featureflow: FeatureflowClient
}

/**
 * @ignore
 */
export interface EnhancedComponent extends Component {
  subscribeToChanges(featureflow: FeatureflowClient): void;
  // tslint:disable-next-line:invalid-void
  componentDidMount(): Promise<void>;
}
