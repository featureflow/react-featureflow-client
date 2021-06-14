import React, { Component } from 'react';
import {Provider} from "./context";

const defaultFeatureflowConfig = {
  update: false,
  clientName: 'featureflow'
};

export default class FeatureflowProvider extends Component{
  constructor(props, context) {
    super(props, context);
    this.config = {
      ...defaultFeatureflowConfig,
      ...props.config
    };
    this.state = {
      featureflow: props.client,
      config: this.config,
      features: {}
    }
    this._handleUpdated = this.handleUpdated.bind(this);

    this.state.featureflow.on('INIT', this._handleUpdated);
    if (this.config.update){
      this.state.featureflow.on('UPDATED_FEATURE', this._handleUpdated);
    }
  }

  handleUpdated(){
    this.evaluated = {};
    const updatedFeatures = this.state.featureflow.getFeatures();
    this.setState({features: updatedFeatures});
  };

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }

  componentWillUnmount(){
    if (this._handleUpdated){
      this.state.featureflow.off('UPDATED_FEATURE', this._handleUpdated);
      this.state.featureflow.off('INIT', this._handleUpdated);
    }
  }
}