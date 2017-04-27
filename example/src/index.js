import React from 'react'
import {render} from 'react-dom'
import Hello from './Hello'
import { FeatureflowProvider } from '../../src';

import Featureflow from '../../../featureflow-javascript-sdk/src';


const FF_KEY = 'env-d3ade4e76094487aa754247e18069d7f';


const featureflow = Featureflow.init(FF_KEY);

render((
  <FeatureflowProvider client={featureflow}>
    <div>
      <Hello feature="testing-twice"/>
    </div>
  </FeatureflowProvider>
), document.querySelector('#app'));