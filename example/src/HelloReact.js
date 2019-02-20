import React from 'react';
import { withFeatureflow } from '../../src/';

class HelloReact extends React.Component{
  constructor(props){
    super(props);
    this.feature = "tutorial-feature";
    this.state = {
      featureIsOn: props.featureflow.evaluate(this.feature).isOn()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      featureIsOn: nextProps.featureflow.evaluate(this.feature).isOn()
    });
  }

  render() {
    return (
      <div>
        <div>Hello from React</div>
        <div>Evaluating feature '{this.feature}': {this.state.featureIsOn ? 'ON' : 'OFF'}</div>
      </div>
    )
  }
}

const featureflowConfig = {
  update: true,
  waitForInit: true
};

export default withFeatureflow(featureflowConfig)(HelloReact);
