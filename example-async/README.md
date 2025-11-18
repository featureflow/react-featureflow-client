# Featureflow Async Provider Example

This example demonstrates using `asyncFeatureflowProvider` - the recommended approach for production apps.

## Features

- ✅ No flicker - client initializes before React renders
- ✅ Features available immediately
- ✅ Best user experience

## Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Update `src/index.tsx` with your Featureflow API key and user configuration

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## How It Works

The `asyncFeatureflowProvider` function:
1. Initializes the Featureflow client
2. Waits for it to be ready
3. Returns a provider component
4. React renders only after everything is ready

This ensures features are available immediately when components mount.

