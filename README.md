# react-featureflow-client

[![][npm-img]][npm-url]

[![][dependency-img]][dependency-url]

> Official React bindings for [Featureflow Javascript Client](https://github.com/featureflow/featureflow-javascript-sdk)

Get your Featureflow account at [featureflow.io](http://www.featureflow.io)

##Note
Version ^2.x.x uses the new react context API and therefore requires react > 16.3

To use featureflow with versions of react below 16.3, please use the 1.x.x client.

When using the 1.x client you will need to also include the core javascript api:
```bash
$ npm install --save featureflow-client
```
Version 2.x.x includes the core javascript SDK so there is no need to install it in addition to `react-featureflow-client`.

## Installation

Using NPM

```sh
$ npm install --save react-featureflow-client

```
## Example
There is an example in this repository. Add your JS Client Environment SDK Key to example/src/index.tsx

```const FF_KEY = 'sdk-js-env-yourkeyhere';```

And

```sh
cd example
yarn start
```

## Getting Started
Getting started is simple:

1. Wrap your application with a featureflow provider - there should only be one provider - it should sit at your top level App component.

If you have
```javascript
  ReactDOM.render(
      <App feature="example-feature"/>,
    document.getElementById('root')
  );
```
wrap `App` using `withFeatureflowProvider`:
```javascript
import { withFeatureflowProvider, useFeatureflow, useFeatures } from 'react-featureflow-client'

const FF_KEY = 'js-env-YOUR_KEY_HERE';
const user = {
  attributes: {
    tier: 'gold',
    country: 'australia',
    roles: ['role1', 'role2']
  }
};

export default (withFeatureflowProvider({
  apiKey: FF_KEY,
  config: {
    streaming: true,
  },
  user
})(App))
```

2. You then have access to the `featureflow` client and evaluated `features` using hooks:

```javascript
import { useFeatureflow, useFeatures } from 'react-featureflow-client'

const App: React.FC<Props> = () => {

  const featureflow = useFeatureflow();
  const features = useFeatures();
  const feature = 'example-feature';

  return  <div>
    <h1>A very simple example</h1>
    <b>{feature}</b>
    { featureflow.evaluate(feature).isOn() && [
        <p key="1">I am on</p>,
    ]}
    { featureflow.evaluate(feature).isOff() && [
      <p key="1">I am off</p>,
      ]
    }
    {Object.keys(features).map(key => <div>{key} : {features[key]}</div>)}
  </div>
}
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
import { withFeatureflowProvider, useFeatureflow } from 'react-featureflow-client'

// Feature flag key
const FEATURE_KEY = 'my-feature';

// Component that will be shown when feature is ON
const NewWelcomeMessage = () => (
  <div className="welcome-message new">
    <h1>Welcome to the Future!</h1>
    <p>You're seeing our new, improved welcome message</p>
  </div>
)

// Component that will be shown when feature is OFF
const OldWelcomeMessage = () => (
  <div className="welcome-message old">
    <h1>Hello World!</h1>
    <p>Welcome to React v19</p>
  </div>
)

function App() {
  const featureflow = useFeatureflow()
  const isOn = featureflow.evaluate(FEATURE_KEY).isOn()

  return (
    <div className="app-container">
      {isOn ? <NewWelcomeMessage /> : <OldWelcomeMessage />}      
    </div>
  )
}

const FF_KEY = 'sdk-js-env-mykey'
const user = {
  id: 'test-user-1',
  attributes: {
    email: 'test@example.com',
    plan: 'free'
  }
}

export default withFeatureflowProvider({
  apiKey: FF_KEY,
  user
})(App)

```

## License

Apache-2.0

[npm-url]: https://nodei.co/npm/react-featureflow-client
[npm-img]: https://nodei.co/npm/react-featureflow-client.png

[dependency-url]: https://www.featureflow.io
[dependency-img]: https://www.featureflow.io/wp-content/uploads/2016/12/featureflow-web.png
