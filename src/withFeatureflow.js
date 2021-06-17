//
import React, {useEffect, useState} from 'react';
import { Consumer } from "./context";

const withFeatureflow = (featureflowConfig) => {
    return (WrappedComponent) => {
        const Wrapped = ({...props}) => (
            <Consumer>
                {({featureflow, config}) => {
                    const combinedConfig = {
                        ...config,
                        ...featureflowConfig
                    };

                    const currentFeatures = featureflow.getFeatures();
                    const [features, setFeatures] = useState(currentFeatures);
                    const [evaluates, setEvaluates] = useState(currentFeatures);

                    const handleUpdated = () => {
                        const updatedFeatures = this.state.featureflow.getFeatures();
                        setFeatures(updatedFeatures);
                    }

                    useEffect(() => {
                        featureflow.on('INIT', handleUpdated);
                        if (config.update) {
                            featureflow.on('UPDATED_FEATURE', handleUpdated);
                        }
                        return function cleanup() {
                            featureflow.off('INIT', handleUpdated);
                            featureflow.off('UPDATED_FEATURE', handleUpdated);
                        };
                    }, []);

                    const evaluate = (feature: string) => {
                        if (evaluates[feature] === undefined){
                            const ev = featureflow.evaluate(feature);
                            setEvaluates(...evaluates, ...{[feature]:ev});
                            return ev;
                        }
                        return evaluates[feature];
                    };

                    const goal = (goalKey: string) => {
                        return featureflow.goal(goalKey);
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