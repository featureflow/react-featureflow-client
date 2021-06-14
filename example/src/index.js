import React from 'react'
import {render} from 'react-dom'
import Hello from './Hello'
import { FeatureflowProvider } from '../../src';

import Featureflow from '../../../featureflow-javascript-sdk/src';


const FF_KEY = 'js-env-bbb659960a3344c5a31681282c0c4bdf';
var user = {
    attributes:{
        tier: 'gold',
        country: 'australia',
        roles: ['role1', 'role2']
    }
};


const featureflow = Featureflow.init(FF_KEY, user, {
    offline: false,
    streaming: true,
    defaultFeatures: {
        'example-feature': 'off'
    },
});

render((
  <FeatureflowProvider client={featureflow}>
    <div>
      <Hello feature="example-feature"/>
    </div>
  </FeatureflowProvider>
), document.querySelector('#app'));