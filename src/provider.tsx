import * as React from 'react';
import {offlineFeatureflow, Provider} from './context';

import createFeatureflowClient from "./createFeatureflowClient";
import {
  AsyncFeatureflowProviderConfig,
  EnhancedComponent,
  EvaluatedFeatureSet,
  FeatureflowClient,
  FeatureflowContext as ProviderState
} from "./types";

class FeatureflowProvider extends React.Component<AsyncFeatureflowProviderConfig, ProviderState> implements EnhancedComponent {
  readonly state: Readonly<ProviderState>;

  constructor(props: AsyncFeatureflowProviderConfig) {
    super(props);

    this.state = {
      features: {},
      featureflow: offlineFeatureflow(this.props.config),
    };
  }

  subscribeToChanges = (featureflow: FeatureflowClient) => {
    featureflow.on('INIT', () => {
      const newFeatures: EvaluatedFeatureSet = featureflow.getFeatures();
      if (Object.keys(newFeatures).length > 0) {
        this.setState(({features}) => ({features: { ...features, ...newFeatures}}));
      }
    });
    featureflow.on('INIT', () => {
      const newFeatures: EvaluatedFeatureSet = featureflow.getFeatures();
      if (Object.keys(newFeatures).length > 0) {
        this.setState(({features}) => ({features: { ...features, ...newFeatures}}));
      }
    });
    featureflow.on('UPDATED_FEATURE', (item: any) => {
      console.log('UPDATED_FEATURE', item);
      const newFeatures: EvaluatedFeatureSet = featureflow.getFeatures();
      if (Object.keys(newFeatures).length > 0) {
        this.setState(({features}) => ({features: { ...features, ...newFeatures}}));
      }
    });
  };

  initialiseFeatureflow = async () => {
    const { apiKey, config, user } = this.props;

    const featureflow = await createFeatureflowClient(apiKey, config, user);
    this.setState({ features: featureflow.getFeatures(), featureflow });
    this.subscribeToChanges(featureflow);
  };

  async componentDidMount() {
    await this.initialiseFeatureflow();
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

export default FeatureflowProvider;
