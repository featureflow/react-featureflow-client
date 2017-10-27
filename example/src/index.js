import React from 'react'
import {render} from 'react-dom'
import Hello from './Hello'
import { FeatureflowProvider } from '../../src';

import Featureflow from '../../../featureflow-javascript-sdk/src';


const FF_KEY = 'js-env-2bf643c830d5403a9936292136e06d10';


//let featureflow = Featureflow.init(constants.FF_API_KEY);
var context = {
    key: 'user1',
    values: {
        tier: 'gold',
        country: 'australia'
    }
};
var config = {
    streaming: true,
    baseUrl: 'http://app.featureflow.dev',
    rtmUrl: 'http://rtm.featureflow.dev'
};
//let featureflow = Featureflow.init(constants.FF_API_KEY, context, config);

const featureflow = Featureflow.init(FF_KEY, context, config);


render((
  <FeatureflowProvider client={featureflow}>
    <div>
      <Hello feature="testing-twice"/>
    </div>
  </FeatureflowProvider>
), document.querySelector('#app'));