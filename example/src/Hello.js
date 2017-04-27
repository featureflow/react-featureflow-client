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
}

export default withFeatureflow({update: true})(Hello);