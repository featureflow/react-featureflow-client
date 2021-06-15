//
import React from 'react';
import { Consumer } from "./context";

export default function (featureflowConfig) {
    return (WrappedComponent) => {

        return (props) => (
            <Consumer>
                {({featureflow, config}) => {
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