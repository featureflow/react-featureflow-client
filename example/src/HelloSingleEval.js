import React from 'react'
import { withFeatureflow } from '../../src/';

class HelloSingleEval extends React.Component{
  constructor(props){

    super(props);
    this.feature = "feature-two";
    this.featureIsOn = props.featureflow.evaluate(this.feature).isOn();

    this.state = {
      counter: 1
    }
  }
  componentDidMount(){
    setInterval(()=>{
      this.setState({
        counter: this.state.counter + 1
      });
    }, 1000)
  }

  render() {
    return (
        <div>
          <h1>Hello from React</h1>
          <b>Evaluating feature: {this.feature}</b>
          {this.featureIsOn && [
            <p key="1">The {this.feature} feature is on</p>,
          ]}
          {!this.featureIsOn && [
            <p key="1">The {this.feature} feature is off</p>
          ]}
        </div>
    )
  }
}

export default withFeatureflow({update: true, waitForInit: true})(HelloSingleEval);