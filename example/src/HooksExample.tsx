import React from 'react'

import { useFeatureflow, useFeatures } from 'react-featureflow-client'
import './index.css'

type Props = {
  feature: string
}

const HooksExample: React.FC<Props> = (props) => {
  const featureflow = useFeatureflow();
  const features = useFeatures();
  const {feature} = props;
  return <div>
    <b>{feature}</b>
    { featureflow.evaluate(feature).isOn() && [
        <p key="1">I am on</p>,
    ]}
    { featureflow.evaluate(feature).isOff() && [
      <p key="1">I am off</p>,
      ]
    }

    {Object.keys(features).map(key => <div>{key} : {features[key]}</div>)}
  </div>
}

export default HooksExample
