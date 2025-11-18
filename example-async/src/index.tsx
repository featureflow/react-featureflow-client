import React from 'react';
import ReactDOM from 'react-dom';
import { asyncFeatureflowProvider } from 'react-featureflow-client';
import App from './App';

// Replace with your Featureflow API key
const FF_API_KEY = 'js-env-abb3a2a61195407a81e21b3466adfc07';

// Replace with your user object
const user = {
  id: 'user-123',
  attributes: {
    tier: 'gold',
    country: 'australia',
  }
};

/**
 * This example demonstrates asyncFeatureflowProvider
 * 
 * The client is initialized BEFORE React renders, ensuring:
 * - No flicker from feature changes
 * - Features are available immediately
 * - Best user experience
 */
const initApp = async () => {
  try {
    // Initialize Featureflow and wait for it to be ready
    const FeatureflowProvider = await asyncFeatureflowProvider({
      apiKey: FF_API_KEY,
      config: {
        offline: false,
      },
      user: user
    });

    // Render the app once Featureflow is ready
    ReactDOM.render(
      <React.StrictMode>
        <FeatureflowProvider>
          <App />
        </FeatureflowProvider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  } catch (error) {
    console.error('Failed to initialize Featureflow:', error);
    ReactDOM.render(
      <div style={{ padding: '20px' }}>
        <h1>Error</h1>
        <p>Failed to initialize Featureflow. Please check your configuration.</p>
        <pre>{String(error)}</pre>
      </div>,
      document.getElementById('root')
    );
  }
};

initApp();

