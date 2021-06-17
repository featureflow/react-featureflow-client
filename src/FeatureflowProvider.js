import React, {useEffect, useState} from 'react';
import {Provider} from "./context";
import { object, string, bool, node } from 'prop-types'

const defaultFeatureflowConfig = {
    update: false,
    clientName: 'featureflow'
};

const FeatureflowProvider = (props) => {
    const config = {
        ...defaultFeatureflowConfig,
        ...props.config
    };

    const context = {
        featureflow: props.client,
        config,
        features: {}
    };

    return <Provider value={context}>{props.children}</Provider>;
}

FeatureflowProvider.propTypes = {
    client: object.isRequired,
    config: object,
    update: bool,
    clientName: string,
    children: node.isRequired,


}

export default FeatureflowProvider;
