import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {FeatureflowProvider} from 'react-featureflow-client'

const Featureflow = require('featureflow-client') // until we convert to TS


const FF_KEY = 'js-env-bbb659960a3344c5a31681282c0c4bdf';

const user = {
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


ReactDOM.render(
  <FeatureflowProvider client={featureflow}>
    <App feature="example-feature"/>
  </FeatureflowProvider>,
  document.getElementById('root'))
