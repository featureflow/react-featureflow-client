//
import React, {useEffect, useState} from 'react';
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
                    };
                    const [state, setState] = useState({
                        featureflow: props.client,
                        config,
                        features: {}
                    });

                    const handleUpdated = () => {
                        const updatedFeatures = this.state.featureflow.getFeatures();
                        setState({...state, features: updatedFeatures});
                    }

                    useEffect(() => {
                        state.featureflow.on('INIT', handleUpdated);
                        if (state.config.update) {
                            state.featureflow.on('UPDATED_FEATURE', handleUpdated);
                        }
                        return function cleanup() {
                            state.featureflow.off('INIT', handleUpdated);
                            state.featureflow.off('UPDATED_FEATURE', handleUpdated);
                        };
                    }, []);

                    const evaluate = (feature: string) => {
                        if (this.evaluated[feature] === undefined){
                            this.evaluated[feature] = state.featureflow.evaluate(feature)
                        }
                        return this.evaluated[feature];
                    };

                    const goal = (goalKey: string) => {
                        return state.featureflow.goal(goalKey);
                    };

                    return <WrappedComponent
                        {...{[combinedConfig.clientName]: featureflow}}
                        evaluate={evaluate()}
                        goal={goal}
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