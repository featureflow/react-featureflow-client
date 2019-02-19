import React from 'react'
import { withFeatureflow } from '../../src/';

class Hello extends React.Component{
  constructor(props){
    super(props);

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
    let props = this.props;
    const feature = "feature-one";

    return (
        <div>
          <h1>Hello from React</h1>
          <b>Evaluating feature: {feature}</b>
          {props.featureflow.evaluate(feature).isOn() && [
            <p key="1">The {feature} feature is on</p>,
          ]}
          {props.featureflow.evaluate(feature).isOff() && [
            <p key="1">The {feature} feature is off</p>
          ]}
        </div>
    )
  }
}

export default withFeatureflow({update: true, waitForInit: true})(Hello);