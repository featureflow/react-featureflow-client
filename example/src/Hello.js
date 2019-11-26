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
    const feature = props.feature || 'hello';
    return (
      <div>
        <h1>A very simple example</h1>
        <b>{feature}</b>
        {props.featureflow.evaluate(feature).isOn() && [
          <p key="1">I am on</p>,
        ]}
        {props.featureflow.evaluate(feature).isOff() && [
          <p key="1">I am off</p>,
        ]}
      </div>
    )
  }
}

export default withFeatureflow({update: true, waitForInit: true})(Hello);