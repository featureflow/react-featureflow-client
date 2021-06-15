//
import React from 'react';
import { Consumer } from "./context";
import { any } from 'prop-types'

const withFeatureflow = (featureflowConfig) => {
    return (WrappedComponent) => {
        const Wrapped = ({...props}) => (
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
        Wrapped.propTypes = {
            rest: any,
        };
        Wrapped.displayName = `withFeatureflow(${WrappedComponent.displayName || WrappedComponent.name}`;
        return Wrapped;
    }
}
export default withFeatureflow;