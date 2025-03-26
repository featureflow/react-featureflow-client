import {ReactNode} from "react";

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
  hasReceivedInitialResponse(): boolean
}

export interface Evaluate {
    value(): string
    is(value: string): string
    isOn(): boolean
    isOff(): boolean
}

/**
 * Contains the configuration available to initialise and provide a featureflow client
 */
export interface FeatureflowProviderConfig {
  config?: FeatureflowReactConfig
  /**
   * Your instantiated featureflow client.
   */
  client: FeatureflowClient
  children?: ReactNode
}

/**
 * Contains the configuration available to initialise and provide a featureflow client
 */
export interface AsyncFeatureflowProviderConfig {
  apiKey: string
  config: FeatureflowClientConfig,
  user?: FeatureflowUser
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
  config?: FeatureflowReactConfig
  features: EvaluatedFeatureSet
  featureflow: FeatureflowClient
}

/**
 * Configuration to be passed
 * to either the FeatureflowProvider
 * or the withFeatureflow HOC
 * Passing to the featureflowProvider sets the 'defaults' for each consumer
 * Setting in the withFeatureflow HOC overrides the defaults for the underlying component.
 */
export interface FeatureflowReactConfig {
  update?: boolean,
  waitForInit?: boolean,
  preInitComponent?: JSX.Element
  children?: ReactNode
}

export interface FeatureflowInjectedProps {
  features: FeatureSet
  featureflow: FeatureflowClient
}

export interface UserAttributes<T = string | number | boolean> {
  [key: string]: T | T[]
}

export interface FeatureflowUser {
  id?: string
  attributes: UserAttributes
}

export interface FeatureflowClientConfig {
  rtmUrl?: string
  baseUrl?: string
  eventsUrl?: string
  streaming?: boolean
  useCookies?: boolean
  offline?: boolean
  defaultFeatures?: FeatureSet,
  uniqueEvals?: boolean
}

export interface State {
  config: FeatureflowReactConfig
  features: EvaluatedFeatureSet
  featureflow: FeatureflowClient
}



/**
 * @ignore
 */
export interface EnhancedComponent extends React.Component {
  subscribeToChanges(featureflow: FeatureflowClient): void;
  // tslint:disable-next-line:invalid-void
  componentDidMount(): Promise<void>;
}
