# Async Provider Example

This directory contains examples demonstrating both provider approaches:

## Standard Provider (`FeatureflowProvider`)

**Files:** `src/App.tsx`, `src/index.tsx`

This is the standard approach where the provider initializes the client in `useEffect` (after mount).

**Pros:**

- Can be used conditionally
- More flexible for dynamic initialization
- Works anywhere in the component tree

**Cons:**

- Potential flicker as features load
- Features not immediately available

## Async Provider (`asyncFeatureflowProvider`) - Recommended

**Files:** `src/AppAsync.tsx`, `src/indexAsync.tsx`

This approach initializes the client **before** React renders, ensuring features are available immediately.

**Pros:**

- ✅ No flicker - client ready before render
- ✅ Features available immediately
- ✅ Better UX
- ✅ Simpler provider component

**Cons:**

- Must be used at the app entry point
- Requires async initialization

## How to Switch to Async Provider

1. Backup your current `src/index.tsx`:
   ```bash
   cp src/index.tsx src/index.standard.tsx
   ```

2. Copy the async example:
   ```bash
   cp src/indexAsync.tsx src/index.tsx
   cp src/AppAsync.tsx src/App.tsx
   ```

3. Update the API key and user configuration in `src/index.tsx`

4. Start the app:
   ```bash
   yarn start
   ```

## Code Comparison

### Standard Provider
```tsx
// index.tsx
import { FeatureflowProvider } from 'react-featureflow-client';

ReactDOM.render(
  <FeatureflowProvider apiKey={KEY} user={user}>
    <App />
  </FeatureflowProvider>,
  document.getElementById('root')
);
```

### Async Provider (Recommended)
```tsx
// index.tsx
import { asyncFeatureflowProvider } from 'react-featureflow-client';

const initApp = async () => {
  const FeatureflowProvider = await asyncFeatureflowProvider({
    apiKey: KEY,
    config: { offline: false },
    user: user
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

## Recommendation

For production apps, use `asyncFeatureflowProvider` for the best user experience with no flicker.

