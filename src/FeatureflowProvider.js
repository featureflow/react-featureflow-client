import React, { Component } from 'react';
import { featureflowClientShape, featureflowConfigShape } from './PropTypes';


const defaultFeatureflowConfig = {
  update: false,
  clientName: 'featureflow'
};


export default class FeatureflowProvider extends Component{
  getChildContext() {
    return { featureflowClient: this.client, featureflowConfig: this.config}
  }

  constructor(props, context) {
    super(props, context);
    this.client = props.client;
    this.config = {
      ...defaultFeatureflowConfig,
      ...props.config
    };
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

FeatureflowProvider.childContextTypes = {
  featureflowClient: featureflowClientShape.isRequired,
  featureflowConfig: featureflowConfigShape.isRequired
};