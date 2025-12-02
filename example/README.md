# Featureflow React Example

This example demonstrates both provider patterns in [react-featureflow-client](../).

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Start the example app:**

   ```bash
   yarn start
   ```

## ✨ Switching Between Provider Modes

The example supports **two provider modes** that you can switch between using the buttons in the UI:

### Standard Provider Mode (default)
- URL: `http://localhost:3000`
- Uses `<FeatureflowProvider>` component
- Client initializes in `useEffect` (after mount)
- Simple setup, but may cause brief flicker as features load

### Async Provider Mode
- URL: `http://localhost:3000/#async`
- Uses `asyncFeatureflowProvider()` function
- Client initializes **before** React renders
- No flicker — features available immediately
- Recommended for production apps

## 📂 Project Structure

- `src/index.tsx` – Entry point with both provider modes and mode switching
- `src/HooksExample.tsx` – Example usage of `useFeatureflow` and `useFeatures` hooks

## ✨ Configuration

Update your Featureflow SDK Key in [`src/index.tsx`](./src/index.tsx):

```ts
const FF_KEY = 'js-env-<your-sdk-key-here>';
```

## 📝 Notes

- This example uses [Create React App](https://github.com/facebook/create-react-app)
- It links to your local version of `react-featureflow-client` for development

For more details, see the [main README](../README.md).
