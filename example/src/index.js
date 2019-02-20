import React from 'react';
import {render} from 'react-dom';
import HelloReact from './HelloReact';
import {FeatureflowProvider} from '../../src';
import Featureflow from '../../../featureflow-javascript-sdk/src';

const featureflow = Featureflow.init('js-env-bbb659960a3344c5a31681282c0c4bdf');

render((
  <FeatureflowProvider client={featureflow}>
    <div>
      <HelloReact />
    </div>
  </FeatureflowProvider>
), document.querySelector('#app'));
