export interface Feature {
  rules: Rules
}

export interface Rules {
  audience?: Audience
  variant: string
}

export type Audience = {
  conditions: Conditions
}

export type Conditions = {
  target: string
  operator: string
  values: any
}

export interface FeatureflowClient {
  on: any
  off: any
  getFeatures(): any
  evaluate(feature: string): any
}

/**
 * Contqins the configuration available to initialise and provide a featureflow client
 */
export interface FeatureflowProviderConfig {
  /**
   * If waitForInit is true then the application will not be initialised until featureflow has received evaluated features.
   * Featureflow uses a unique combination of global CDN, edge-caching and smart split-evaluation to optimise delivery.
   */
  waitForInit?: boolean
  /**
   * This are the main featureflow-javascript-sdk configuration options used to initialise the client.
   */
  featureflowConfig?: FeatureflowClientConfig
}

export interface FeatureSet {
  [key: string]: Feature
}

export interface FeatureflowContext {
  features: FeatureSet
  featureflow?: FeatureflowClient
}

export interface FeatureflowInjectedProps {
  features?: FeatureSet
  featureflow?: FeatureflowClient
}

export interface UserAttributes<T = string | number | boolean> {
  [key: string]: T | T[]
}

export interface FeatureflowUser {
  id?: string
  attributes: UserAttributes
}

export interface FeatureflowClientConfig {
  apiKey: string
  user?: FeatureflowUser
  rtmUrl?: string
  baseUrl?: string
  eventsUrl?: string
  streaming?: boolean
  useCookies?: boolean
  offline?: boolean
}

export interface State {
  features: FeatureSet
  featureflow?: FeatureflowClient
}
