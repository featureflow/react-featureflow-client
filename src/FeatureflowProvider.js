import React, {useEffect, useState} from 'react';
import {Provider} from "./context";
import { object, string, bool } from 'prop-types'

const defaultFeatureflowConfig = {
    update: false,
    clientName: 'featureflow'
};

const FeatureflowProvider = (props) => {
    const config = {
        ...defaultFeatureflowConfig,
        ...props.config
    };
    const [state, setState] = useState({
        featureflow: props.client,
        config,
        features: {}
    })


    const handleUpdated = () => {
        const updatedFeatures = this.state.featureflow.getFeatures();
        setState({...state, features: updatedFeatures});
    };

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

    return <Provider value={state}>{props.children}</Provider>;
}
FeatureflowProvider.propTypes = {
    client: object.isRequired,
    config: object,
    update: bool,
    clientName: string
}

export default FeatureflowProvider;
