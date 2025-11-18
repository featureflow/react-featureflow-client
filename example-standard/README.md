# Featureflow Standard Provider Example

This example demonstrates using `FeatureflowProvider` - the standard approach for conditional or dynamic initialization.

## Features

- Can be used conditionally
- More flexible for dynamic initialization
- Works anywhere in the component tree

## Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Update `src/App.tsx` with your Featureflow API key and user configuration

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## How It Works

The `FeatureflowProvider` component:
1. Renders immediately
2. Initializes the Featureflow client in `useEffect` (after mount)
3. Updates when the client is ready

Use this approach when you need to conditionally render the provider or initialize it dynamically.

