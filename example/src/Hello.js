import React from 'react'
import { withFeatureflow } from '../../src/';

function Hello (props) {

  const feature = props.feature || 'hello';

  return (
    <div>
      <h1>Hello from React</h1>
      <b>{feature}</b>
      {props.featureflow.evaluate(feature).isOn() && [
        <p key="1">I should be seen</p>,
        <p key="2">yesington</p>
      ]}
      {props.featureflow.evaluate(feature).isOff() && [
        <p key="1">I should not be seen</p>,
        <p key="2">nooo</p>
      ]}
    </div>
  )
}

function mapPropsToFeature(props){
  return [props.feature || 'hello']
}

export default withFeatureflow(mapPropsToFeature)(Hello);