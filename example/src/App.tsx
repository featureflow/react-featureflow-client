import React from 'react'

import { withFeatureflow, FeatureflowInjectedProps } from 'react-featureflow-client'
import './index.css'

type Props = {
  feature: string
}

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

export default (withFeatureflow({update: true, waitForInit: true, preInitComponent: <div>loading</div>})(App))
