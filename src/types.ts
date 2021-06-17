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
  on(event: string, callback: Function): any
  off(event: string): any
  getFeatures(): EvaluatedFeatureSet
  evaluate(feature: string): Evaluate
  goal(goalKey: string): void
}

export interface Evaluate {
    value(): string
    is(value: string): string
    isOn(): boolean
    isOff(): boolean
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

  /**
   * You may wish to import an already instantiated featureflow client.
   * If an externally created client is provided then this provider will not create it's own instance.
   */
  client?: FeatureflowClient
}

/**
 * A set of pre-evaluated feature evaluate objects
 */
export interface EvaluateSet {
  [key: string]: Evaluate
}

/**
 * A set of partially evaluated features
 */
export interface FeatureSet {
  [key: string]: Feature
}

/**
 * A set of partially evaluated features
 */
export interface EvaluatedFeatureSet {
  [key: string]: string
}

export interface FeatureflowContext {
  features: EvaluatedFeatureSet
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
  features: EvaluatedFeatureSet
  featureflow?: FeatureflowClient
}
