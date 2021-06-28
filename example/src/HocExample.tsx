import React from 'react'

import { withFeatureflow } from 'react-featureflow-client'
import './index.css'
import {FeatureflowInjectedProps} from "../../src";

interface Props extends FeatureflowInjectedProps {
  feature: string
}

const HocExample: React.FC<Props> = (props: Props) => {
  const { feature, features, featureflow } = props;

  return  <div>
    <b>{feature}</b>
    { featureflow.evaluate(feature).isOn() && [
        <p key="1">{feature} is on</p>,
    ]}
    { featureflow.evaluate(feature).isOff() && [
      <p key="1">{feature} is off</p>,
      ]
    }

    {Object.keys(features).map(key => <div key={key}>{key} : {features[key]}</div>)}
  </div>
}

export default (withFeatureflow({
  update: false,
  waitForInit: true,
  preInitComponent: <div>loading...</div>
})(HocExample))
