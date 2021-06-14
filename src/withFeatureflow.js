//
import React from 'react';
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
  }
}