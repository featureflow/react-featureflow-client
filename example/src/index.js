import React from 'react'
import {render} from 'react-dom'
import Hello from './Hello'
import { FeatureflowProvider } from '../../src';

import Featureflow from '../../../featureflow-javascript-sdk/src';


const FF_KEY = '<API_KEY>';


const featureflow = Featureflow.init(FF_KEY);

render((
  <FeatureflowProvider client={featureflow}>
    <div>
      <Hello />
      <Hello feature="example-feature"/>
    </div>
  </FeatureflowProvider>
), document.querySelector('#app'));