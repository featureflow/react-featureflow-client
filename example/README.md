# Featureflow React Example

This simple example shows a typical react application (created with  [Create React App](https://github.com/facebook/create-react-app) ) using featureflow.

It is linked to the react-featureflow-client package in the parent directory for development purposes.

You can run `yarn install` and then `yarn start` to test this example.

## 🚀 Getting Started

1. **Install dependencies:**

   ```bash
   yarn install
   ```

2. **Start the example app:**

   ```bash
   yarn start
   ```

This will run the example React app using the locally linked `react-featureflow-client` package.

---

## ✨ Configuration

- Update your Featureflow SDK Key in [`src/App.tsx`](./src/App.tsx):

  ```ts
  const FF_KEY = 'js-env-<your-sdk-key-here>';
  ```

- Optionally, edit the `user` object to match your test user.

---

## 📂 Project Structure

- `src/App.tsx` – Main entry with the `FeatureflowProvider` setup.
- `src/HooksExample.tsx` – Example usage of the provided hooks.

---

## 📝 Notes

- This example uses [Create React App](https://github.com/facebook/create-react-app).
- It links to your local version of `react-featureflow-client` for development.

For more details or advanced usage, see the [main README](../README.md).


