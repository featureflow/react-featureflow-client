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
  const { evaluate } = props.featureflow;
  return (
    <div>
      <h1>New Feature</h1>
      {evaluate("my-feature-key").isOn() && (
        <div>
          <h2>I will be seen when the feature is on</h2>
          <p>And this is some extra text</p>
        </div>
      )}
      {evaluate("my-feature-key").isOff() && (
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
pass the following object to `withFeatureflow`
```javascript
const featureflowConfig = {
  update: true
}
export default withFeatureflow(featureflowConfig)(MyComponent);
```

or for every component in the `FeatureflowProvider`

```javascript
const featureflowConfig = {
  update: true
}

ReactDOM.render(
  <FeatureflowProvider client={featureflow} config={featureflowConfig}>
    <App />
  </FeatureflowProvider>,
  document.getElementById('app')
);
```

5. If you want your component to wait until featureflow has received an initial response, set `config.waitForInit = true`
in the featureflowConfig. If you want to render a different component while waiting on a 
response from featureflow, you can pass in `config.preInitComponent = <YourComponent/>`. 
This is especially useful if you may have a race condition with your application on initial load of features.

```javascript
const featureflowConfig = {
  waitForInit: true,
  preInitComponent: <YourComponent/>
}

export default withFeatureflow(featureflowConfig)(MyComponent);
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
| `featureflowConfig` | `object` | `{}` | Use to set the `update` property and featureflow `clientName` specifically for the component. See `FeatureflowConfig`. |
| `Component` | `Component` | **`Required`** | The component to pass the featureflow client to.  |


#### `FeatureflowConfig`
| Properties | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| `update` | `boolean` | `false` | If set to `true` then when features update from featureflow, the component will update automatically.  |
| `clientName` | `string` | `"featureflow"` | Use this to change the prop that the featureflow client will bind to.  |
| `waitForInit` | `boolean` | `false` | Use this to wait for featureflow to respond with features before the rendering the component   |
| `preInitComponent` | `ReactComponent` | `undefined` | Use this display another component when the featureflow rules haven't loaded and `waitForInit` is `true`  |


```javascript
import { withFeatureflow } from 'react-featureflow-client';

class MyComponent extends React.Component{
  onClickHandler(){
    this.props.customFeatureflow.updateContext(/*...*/);
  }
  //...
  render(){
    return (
      <div>
        {this.props.customFeatureflow.evaluate('example-feature').isOn() && 
          <p>
            This text will be shown if "example-feature" is "on". 
            It will be updated in realtime if "example-feature" changes it's value.
          </p>
        }
      </div>
    )
  }
}

export default withFeatureflow({update: true, clientName: 'customFeatureflow'})(MyComponent);
```

## License

Apache-2.0

[npm-url]: https://nodei.co/npm/react-featureflow-client
[npm-img]: https://nodei.co/npm/react-featureflow-client.png

[dependency-url]: https://www.featureflow.io
[dependency-img]: https://www.featureflow.io/wp-content/uploads/2016/12/featureflow-web.png