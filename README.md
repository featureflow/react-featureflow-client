# react-featureflow-client

[![][npm-img]][npm-url]

[![][dependency-img]][dependency-url]

> Official React bindings for [Featureflow Javascript Client](https://github.com/featureflow/featureflow-javascript-sdk)

Get your Featureflow account at [featureflow.io](http://www.featureflow.io)

## Installation

Using NPM
```bash
$ npm install --save react-featureflow-client
```

## Getting Started
1. Wrap `<FeatureflowProvider client={featureflow}>` (with an initialised `featureflow` client) around the root of your application.
```javascript
//...
import Featureflow from 'featureflow-client';
import { FeatureflowProvider } from 'react-featureflow';
//...
const featureflow = Featureflow.init(API_KEY);
//...
ReactDOM.render(
  <FeatureflowProvider client={featureflow}>
    <App />
  </FeatureflowProvider>,
  document.getElementById('app')
);
```
2. Wrap your component with `withFeatureflow` and you can access `props.featureflow`.
```javascript
import { withFeatureflow } from 'react-featureflow-client';
const MyComponent = function(props){
  const evaluated = props.featureflow.evaluate("my-feature-key");
  return (
    <div>
      <h1>New Feature</h1>
      {evaluate.isOn() && (
        <div>
          <h2>I will be seen when the feature is on</h2>
          <p>And this is some extra text</p>
        </div>
      )}
      {evaluate.isOff() && (
        <div>
          <h2>This should not be seen if the feature is on</h2>
        </div>
      )}
    </div>
  )
};

export default withFeatureflow()(MyComponent)
```
3. That's it. 

4. If you want to update your component when the evaluated feature changes in realtime, 
pass the following function to `withFeatureflow`
```javascript
function mapFeatureListeners(props){
  return ['my-feature-key']
}
export default withFeatureflow(mapFeatureListeners)(MyComponent)
```

### API
`react-featureflow-client` exposes 2 properties.
```javascript
import {
  FeatureflowProvider, 
  withFeatureflow
} from 'react-featureflow-client';
```
####`<FeatureflowProvider client>`
Connects your featureflow to your React application. Must only have one child.

| Params | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| `client*` | `featureflow` | **`Required`** | An instantiated featureflow client |

####`withFeatureflow([mapFeatureListeners], [clientProp])(Component)`
Pass the featureflow client to a React Component's props.

| Params | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| `mapFeatureListeners` | `function(props)` | `()=>[]` | Use this function to bind feature listeners to update the component in realtime. If the evaluated variant of this value changes then `Component` will be rerendered. Props are passed down as a convenience. |
| `clientProp` | `string` | `'featureflow'` | The prop to bind the featureflow client to. |
| `Component` | `Component` | **`Required`** | The component to pass the featureflow client to.  |

```javascript
import { withFeatureflow } from 'react-featureflow-client';

class MyComponent extends React.Component{
  onClickHandler(){
    this.props.featureflow.updateContext(/*...*/);
  }
  //...
  render(){
    return (
      <div>
        {this.props.featureflow.evaluate('example-feature').isOn() && 
          <p>
            This text will be shown if "example-feature" is "on". 
            It will be updated in realtime if "example-feature" changes it's value.
          </p>
        }
      </div>
    )
  }
}

function mapFeatureListeners(props){
  return ["example-feature"];
}

export default withFeatureflow(mapFeatureListeners)(MyComponent);
```

## License

Apache-2.0

[npm-url]: https://nodei.co/npm/react-featureflow-client
[npm-img]: https://nodei.co/npm/react-featureflow-client.png

[dependency-url]: https://www.featureflow.io
[dependency-img]: https://www.featureflow.io/wp-content/uploads/2016/12/featureflow-web.png