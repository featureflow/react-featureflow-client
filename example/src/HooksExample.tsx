import React, {useState} from 'react'

import { useFeatureflow, useFeatures } from 'react-featureflow-client'
import './index.css'

type Props = {
  feature: string
}

const HooksExample: React.FC<Props> = (props) => {
  const featureflow = useFeatureflow();
  const features = useFeatures();
  const {feature} = props;
  const [goal, setGoal] = useState(false);
  if(!goal && featureflow.hasReceivedInitialResponse()){
    featureflow.goal("hoc-page-viewed");
    setGoal(true);
  }
  return <div>
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

export default HooksExample
