# react-featureflow-client

[![][npm-img]][npm-url]

[![][dependency-img]][dependency-url]

> Official React bindings for [Featureflow Javascript Client](https://github.com/featureflow/featureflow-javascript-sdk)

Get your Featureflow account at [featureflow.io](http://www.featureflow.io)

## Installation

Using NPM
```sh
  npm install --save react-featureflow-client

```
Note that the featureflow javascript sdk is included in this dependency. If you were using a previous version of our react SDK you can safely remove the `featureflow-client` dependency.

## Example
There is a very simple example in this repository. Add your JS Client Environment SDK Key to example/src/App.tsx

```const FF_KEY = 'sdk-js-env-yourkeyhere';```

And
```sh
  npm run example
```

## Getting Started
1. Wrap your root application component with the `withFeatureflowProvider` hoc.

```tsx
  import { withFeatureflowProvider } from 'react-featureflow-client'
...
  withFeatureflowProvider({
    featureflowConfig: {
      user: user,
      apiKey: FF_KEY,
    }
  })(App)
```
This will provide an instance of the featureflowClient and inject the client through your application using the react context api.

2. Wrap your components with `withFeatureflow` and you can access `props.featureflow`.
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
   set ` streaming: true` to `withFeatureflowProvider`
```tsx
  import { withFeatureflowProvider } from 'react-featureflow-client'
...
  withFeatureflowProvider({
    featureflowConfig: {
      user: user,
      apiKey: FF_KEY,
      streaming: true
    }
  })(App)
```

5. If you want your component to wait until featureflow has received an initial response, set `waitForInit: true`
   in the featureflowConfig.

```tsx
  withFeatureflowProvider({
    featureflowConfig: {
      apiKey: FF_KEY
    },
    waitForInit: true
  })(App)
```
### Upgrading from react-featureflow-client@1.x.x
The previous client used the deprecated react context api and took a configured featureflowClient as such:
```jsx
        import { FeatureflowProvider } from 'react-featureflow-client';

        const user = {
          attributes:{
            tier: 'gold',
            country: 'australia',
            roles: ['role1', 'role2']
          }
        };
        let featureflow = Featureflow.init(constants.FF_API_KEY, user, {streaming: true});
        ...
      <FeatureflowProvider client={featureflow}>
          <MyApp/>
      </FeatureflowProvider>
```
The new client creates the featureflowClient instance for you and as such only requires a set of configuration.

The configuration object has changed slightly to include the `user` and `apiKey`

The Provider component has been wrapped in a withFeatureflowProvider HOC function for convenience.

1. extract the configuration you used to create your featureflow client instance
2. Replace `FeatureflowProvider` with `withFeatureflowProvider`
3. Pass in the extracted configuration

```jsx

  import { withFeatureflowProvider } from 'react-featureflow-client';

  withFeatureflowProvider({
  featureflowConfig: {
    user: user,
    apiKey: constants.FF_API_KEY,
    streaming: true
  }
})(MyApp)
```
The `withFeatureflow` HOC remains unchanged and still supplies the featureflow client as props.featureflow


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

## License

Apache-2.0 © [oliveroldfield](https://github.com/oliveroldfield)
