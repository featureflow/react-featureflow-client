// @flow
import React, { Component, PropTypes } from 'react';
import warning from './warning';
import { featureflowClientShape } from './PropTypes';

export default function(mapFeatureListeners: ?()=>string[] = ()=>[], ClientName: string = 'featureflow'){
  return (WrappedComponent)=>{
    class WithFeatureflowClient extends Component{
      _handleUpdated;
      features: string[];
      state;

      constructor(props, context){
        super(props, context);
        if (typeof mapFeatureListeners === 'function'){
          this.features = [].concat(mapFeatureListeners(props));
        }
        else{
          warning('mapFeatureListeners must be a function that returns an array of feature keys: (props) => string[] ');
          this.features = [];
        }

        this.state = this.features.reduce((values, next)=>{
          values[next] = context.client.evaluate(next).value();
          return values;
        }, {});

        if (this.features.length >= 0){
          this._handleUpdated = this.handleUpdated.bind(this);
          this.context.client.on('UPDATED_FEATURE', this._handleUpdated);
        }
      }

      componentWillUnmount(){
        if (this._handleUpdated){
          this.context.client.off('UPDATED_FEATURE', this._handleUpdated);
        }
      }

      handleUpdated(updatedFeatures){
        let newState = {};
        this.features.forEach(feature=>{
          if (updatedFeatures[feature] !== undefined && updatedFeatures[feature] !== this.state[feature]){
            this.evaluated = this.context.client.evaluate(feature);
            newState[feature] = updatedFeatures[feature];
          }
        });

        if (Object.keys(newState).length > 0){
          this.setState(newState);
        }
      }

      //Using custom evaluate to not send events every render
      evaluate(feature: string){
        const is = (value)=>value === this.state[feature];
        return {
          is,
          isOn: is.bind(this, 'on'),
          isOff: is.bind(this, 'off'),
          value: ()=>this.state[feature]
        }
      }

      render(){
        return React.createElement(WrappedComponent, {[ClientName]: {
          ...this.context.client,
          evaluate: this.evaluate.bind(this)
        }, ...this.props});
      }
    }

    WithFeatureflowClient.contextTypes = {
      client: featureflowClientShape.isRequired
    };
    return WithFeatureflowClient;
  }
}