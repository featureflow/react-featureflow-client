import React from 'react'
import {render} from 'react-dom'
import Hello from './Hello'
import HelloSingleEval from './HelloSingleEval'
import {FeatureflowProvider} from '../../src';

import Featureflow from '../../../featureflow-javascript-sdk/src';


const FF_KEY = 'js-env-299d60d027ab49b99022e804eaf9b5b0';


const featureflow = Featureflow.init(FF_KEY);

function activateLasers() {
    reacte.render();
}

render((
    <FeatureflowProvider client={featureflow}>
        <div>
            <Hello />
            <HelloSingleEval />
        </div>
    </FeatureflowProvider>
), document.querySelector('#app'));