// @flow
import React, { Component, PropTypes } from 'react';
import { featureflowClientShape } from './PropTypes';

export default function(ClientName: string = 'featureflow'){
  return (WrappedComponent)=>{
    class WithFeatureflowClient extends Component{
      render(){
        return React.createElement(WrappedComponent, {[ClientName]: this.context.client, ...this.props});
      }
    }

    WithFeatureflowClient.contextTypes = {
      client: featureflowClientShape.isRequired
    };
    return WithFeatureflowClient;
  }
}