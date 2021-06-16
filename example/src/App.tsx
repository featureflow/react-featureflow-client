import React from 'react'

import { withFeatureflow, withFeatureflowProvider, FeatureflowInjectedProps } from 'react-featureflow-client'
import 'react-featureflow-client/dist/index.css'

type Props = {
  feature: string
}
const FF_KEY = 'js-env-bbb659960a3344c5a31681282c0c4bdf';

const user = {
  attributes:{
    tier: 'gold',
    country: 'australia',
    roles: ['role1', 'role2']
  }
};

const App: React.FC<Props & FeatureflowInjectedProps> = (props) => {
  const {feature, featureflow} = props;
  return  <div>
    <h1>A very simple example</h1>
    <b>{feature}</b>
    { featureflow && featureflow.evaluate(feature).isOn() && [
        <p key="1">I am on</p>,
    ]}
    { featureflow && featureflow.evaluate(feature).isOff() && [
      <p key="1">I am off</p>,
      ]
    }
  </div>
}

export default withFeatureflowProvider({
  featureflowConfig: {
    user: user,
    apiKey: FF_KEY,
    streaming: true,
  },
  waitForInit: true
})(withFeatureflow()(App))
