# react-featureflow-client

[![][npm-img]][npm-url]

> Official React bindings for [Featureflow Javascript Client](https://github.com/featureflow/featureflow-javascript-sdk)

Get your Featureflow account at [featureflow.io](http://www.featureflow.io)

## Installation

```bash
npm install react-featureflow-client
```

## Quick Start

### 1. Initialize the Provider (Recommended: Async)

The `asyncFeatureflowProvider` initializes Featureflow **before** your app renders, ensuring features are available immediately with no flicker.

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { asyncFeatureflowProvider } from 'react-featureflow-client';
import App from './App';

const FF_KEY = 'js-env-YOUR_KEY_HERE';
const user = {
  id: 'user-123',
  attributes: {
    tier: 'gold',
    country: 'australia'
  }
};

const initApp = async () => {
  const FeatureflowProvider = await asyncFeatureflowProvider({
    apiKey: FF_KEY,
    user
  });

  ReactDOM.render(
    <FeatureflowProvider>
      <App />
    </FeatureflowProvider>,
    document.getElementById('root')
  );
};

initApp();
```

### 2. Use Feature Flags in Components

```tsx
// App.tsx
import React from 'react';
import { useFeatureflow, useFeatures } from 'react-featureflow-client';

function App() {
  const featureflow = useFeatureflow();
  const features = useFeatures();

  const isNewUIEnabled = featureflow.evaluate('new-ui').isOn();

  return (
    <div>
      {isNewUIEnabled ? <NewUI /> : <OldUI />}
      
      {/* Display all features */}
      <ul>
        {Object.entries(features).map(([key, value]) => (
          <li key={key}>{key}: {value}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Provider Options

### `asyncFeatureflowProvider` (Recommended)

Initializes the client **before** React renders. No flicker, features available immediately.

```tsx
const FeatureflowProvider = await asyncFeatureflowProvider({
  apiKey: 'js-env-YOUR_KEY',
  user: { id: 'user-123', attributes: { plan: 'premium' } },
  config: { offline: false }  // optional
});
```

### `FeatureflowProvider` (Standard)

Initializes the client **after** mount in `useEffect`. Simpler setup, but may cause brief flicker.

```tsx
import { FeatureflowProvider } from 'react-featureflow-client';

<FeatureflowProvider
  apiKey="js-env-YOUR_KEY"
  user={{ id: 'user-123', attributes: { plan: 'premium' } }}
  config={{ offline: false }}
>
  <App />
</FeatureflowProvider>
```

### `FeatureflowProviderWithClient` (Bring Your Own Client)

Use an existing Featureflow client instance:

```tsx
import Featureflow from 'featureflow-client';
import { FeatureflowProviderWithClient } from 'react-featureflow-client';

const client = await Featureflow.init('js-env-YOUR_KEY', user);

<FeatureflowProviderWithClient client={client}>
  <App />
</FeatureflowProviderWithClient>
```

## Hooks

### `useFeatureflow()`

Returns the Featureflow client instance for evaluating features and tracking goals.

```tsx
const featureflow = useFeatureflow();

// Evaluate a feature
const isOn = featureflow.evaluate('my-feature').isOn();
const variant = featureflow.evaluate('my-feature').value();

// Check specific variant
const isPremium = featureflow.evaluate('pricing-tier').is('premium');

// Track a goal
featureflow.goal('button-clicked');
```

### `useFeatures()`

Returns all evaluated features as an object. Automatically updates when features change.

```tsx
const features = useFeatures();

// features = { 'feature-a': 'on', 'feature-b': 'variant-1', ... }
```

## Updating User Context

Update the user context at runtime to re-evaluate features (e.g., after login):

```tsx
const featureflow = useFeatureflow();

// Update user and re-evaluate all features
await featureflow.updateUser({
  id: 'new-user-id',
  attributes: {
    tier: 'premium',
    beta: true
  }
});
```

## TypeScript Support

The package includes TypeScript definitions. Import types as needed:

```tsx
import type { 
  FeatureflowUser, 
  FeatureflowClient,
  Config,
  EvaluatedFeatures 
} from 'react-featureflow-client';
```

## Example App

Run the included example:

```bash
cd example
yarn install
yarn start
```

The example demonstrates:
- Switching between async and standard providers
- Editing user context at runtime
- Feature flag evaluation with hooks

## API Reference

### Exports

| Export | Type | Description |
|--------|------|-------------|
| `asyncFeatureflowProvider` | Function | Async function returning a provider component |
| `FeatureflowProvider` | Component | Standard provider component |
| `FeatureflowProviderWithClient` | Component | Provider accepting an existing client |
| `useFeatureflow` | Hook | Returns the Featureflow client |
| `useFeatures` | Hook | Returns evaluated features object |

### Provider Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `apiKey` | `string` | Yes | Your Featureflow JS environment SDK key |
| `user` | `FeatureflowUser` | No | User context for targeting |
| `config` | `Config` | No | Client configuration options |

### FeatureflowUser

```tsx
interface FeatureflowUser {
  id: string;
  attributes?: {
    [key: string]: string | number | boolean | string[];
  };
}
```

## Migration from v1.x

Version 2.x uses the React Context API and requires React 16.3+.

**Key changes:**
- Use `asyncFeatureflowProvider` or `FeatureflowProvider` instead of `withFeatureflowProvider`
- Use `useFeatureflow()` and `useFeatures()` hooks instead of HOCs
- The `featureflow-client` SDK is now bundled (no separate install needed)

## License

Apache-2.0

[npm-url]: https://nodei.co/npm/react-featureflow-client
[npm-img]: https://nodei.co/npm/react-featureflow-client.png
