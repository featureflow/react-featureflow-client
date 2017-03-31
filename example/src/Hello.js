import React from 'react'
import { Evaluate, Variant, withClient } from '../../src/';

function Hello (props) {
  console.log(props);
  return (
    <div>
      <h1>Hello from React</h1>
      <Evaluate feature={props.feature || 'hello'}>
        <Variant is="on">
          <p>I should be seen</p>
        </Variant>
        <Variant is="off">
          <p>I should not be seen</p>
        </Variant>
      </Evaluate>
    </div>
  )
}

export default withClient()(Hello);