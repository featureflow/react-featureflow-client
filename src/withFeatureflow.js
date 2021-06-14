//
import React, { Component } from 'react';
import {Consumer} from "./context";


type FeatureflowConfig = {
  update?: boolean,
  clientName?: string,
  waitForInit?: boolean,
  preInitComponent?: React.Element<any>
}

export default function(featureflowConfig: ? FeatureflowConfig = {}){
  return ( WrappedComponent ) => {

    return (props) => (
        <Consumer>
          {({ featureflow, config }) => {
            const combinedConfig = {
              ...config,
              ...featureflowConfig
            }
            return <WrappedComponent
                {...{[combinedConfig.clientName]: featureflow}}
                evaluate
                goal
                {...props}
               />
          }}
        </Consumer>
    )
    /*class WithFeatureflowClient extends Component{
      _handleUpdated;
      state;
      evaluated: {};
      config;

      constructor(props, context){
        debugger;
        

        super(props, context);

        this.config = {
          ...this.context.featureflowConfig,
          ...featureflowConfig
        };

        this.state = this.context.featureflowClient.getFeatures();
        this.evaluated = {};

        this._handleUpdated = this.handleUpdated.bind(this);

        this.context.featureflowClient.on('INIT', this._handleUpdated);

        if (this.config.update){
          this.context.featureflowClient.on('UPDATED_FEATURE', this._handleUpdated);
        }
      }

      componentWillUnmount(){
        if (this._handleUpdated){
          this.context.featureflowClient.off('UPDATED_FEATURE', this._handleUpdated);
          this.context.featureflowClient.off('INIT', this._handleUpdated);
        }
      }

      handleUpdated(){
        this.evaluated = {};
        this.setState(this.context.featureflowClient.getFeatures());
      }

      //Caching evaluate to not send events every render
      evaluate(feature: string){
        if (this.evaluated[feature] === undefined){
          this.evaluated[feature] = this.context.featureflowClient.evaluate(feature)
        }
        return this.evaluated[feature];
      }
      goal(goalKey: string){
        return this.context.featureflowClient.goal(goalKey);
      }
      render(){

        if (this.config.waitForInit && !this.context.featureflowClient.hasReceivedInitialResponse()){
          return this.config.preInitComponent || <div></div>
        }
        return React.createElement(WrappedComponent, {[this.config.clientName]: {
          ...this.context.featureflowClient,
          evaluate: this.evaluate.bind(this),
          goal: this.goal.bind(this),
        }, ...this.props});
      }
    }

    WithFeatureflowClient.contextTypes = {
      featureflowClient: featureflowClientShape.isRequired,
      featureflowConfig: featureflowConfigShape.isRequired
      
    };
    return WithFeatureflowClient;*/
  }
}