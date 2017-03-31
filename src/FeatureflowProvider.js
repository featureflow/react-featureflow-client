// @flow
import React, { Component } from 'react';
import { featureflowClientShape } from './PropTypes';

export default class FeatureflowProvider extends Component{
  getChildContext() {
    return { client: this.client}
  }

  constructor(props, context) {
    super(props, context);
    this.client = props.client;
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

FeatureflowProvider.childContextTypes = {
  client: featureflowClientShape.isRequired
};