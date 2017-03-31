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
2. In your components, use `<Evaluate feature={featureKey}/>` and `<Variant is={variantValue}/>` to show components.
```javascript
import { Evaluate, Variant } from 'react-featureflow-client';
export default function(){
  return (
    <div>
      <h1>New Feature</h1>
      <Evaluate feature="my-feature-key">
        <Variant is="on">
          <h2>I will be seen when the feature is on</h2>
          <p>And this is some extra text</p>
        </Variant>
        <Variant is="off">
          <h2>This should not bee seen if the feature is on</h2>
        </Variant>
      </Evaluate>
    </div>
  )
}
```
3. That's it. 

When the feature changes the user will receive the update in realtime and will redisplay the component.
If you do not want realtime updates for a feature, do the following:
```javascript
<Evaluate feature="example-feature" realtime={false}>
...
</Evaluate>
```

### API
`react-featureflow-client` exposes 4 properties.
```javascript
import {
  FeatureflowProvider, 
  Evaluate, 
  Variant, 
  withClient
} from 'react-featureflow-client';
```
####`<FeatureflowProvider client>`
Connects your featureflow to your React application. Must only have one child.

| Params | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| `client*` | `featureflow` | **`Required`** | An instantiated featureflow client |


####`<Evaluate feature [realtime]>`
 Evaluates a feature in your React Component.

| Params | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| `feature*` | `string` | **`Required`** | The feature key that you are evaluating against |
| `realtime` | `boolean` | `true` | If `true` it will change the displayed `<Variant/>` if the feature's variant changes. If `false` it will only calculate the variant when the component mounts, and will display the same `<Variant/>` for the component's lifecycle.  |
| `children` | `<Variant>` | | Children must be an instance of `<Variant>`, any other type will not be displayed. |

####`<Variant [is | isOn | isOff]*>`
Wraps a feature variation. Will only show when the feature variant is on for the current context. Must only be a child of an `<Evaluate>` component. 

| Params | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| `is` | `string` | **`Required`** | The variant you are testing agains. If the feauture evaluates to this variant, the children of this component will be shown. |
| `isOn` | `boolean` |  | Helper prop to test the `"on"` variant. `<Variant isOn>` is equivalent to `<Variant is='on'>`.  |
| `isOff` | `boolean` | | Helper prop to test the `"off"` variant. `<Variant isOff>` is equivalent to `<Variant is='off'>`.  |

####`withClient([clientProp])(Component)`
Pass the featureflow client to a React Component's props.

| Params | Type | Default | Description |
|---------------|----------|--------------|----------------------------------------------------------------|
| `clientProp` | `string` | `'featureflow'` | The prop to bind the featureflow client to. |
| `Component` | `Component` | **`Required`** | Helper prop to test the `"on"` variant. `<Variant isOn>` is equivalent to `<Variant is='on'>`.  |

```javascript
import { withClient } from 'react-featureflow-client';

class MyComponent extends React.Component{
  onClickHandler(){
    this.props.featureflow.updateContext(/*...*/);
  }
  //...
}

export default withClient()(MyComponent);
```

## License

Apache-2.0

[npm-url]: https://nodei.co/npm/react-featureflow-client
[npm-img]: https://nodei.co/npm/react-featureflow-client.png

[dependency-url]: https://www.featureflow.io
[dependency-img]: https://www.featureflow.io/wp-content/uploads/2016/12/featureflow-web.png