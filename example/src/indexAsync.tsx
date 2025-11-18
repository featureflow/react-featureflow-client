import React from 'react';
import ReactDOM from 'react-dom';
import { asyncFeatureflowProvider } from 'react-featureflow-client';
import './index.css';
import AppAsync from './AppAsync';

const FF_KEY = 'js-env-bbb659960a3344c5a31681282c0c4bdf';
const user = {
  id: 'user-123',
  attributes: {
    tier: 'gold',
    country: 'australia',
    roles: ['role1', 'role2']
  }
};

/**
 * Example entry point using asyncFeatureflowProvider
 * 
 * This is the recommended approach for production apps as it:
 * - Initializes the client before React renders
 * - Prevents flicker from feature changes
 * - Ensures features are available immediately
 * 
 * To use this example, rename this file to index.tsx (backup the original first)
 */
const initApp = async () => {
  try {
    // Initialize Featureflow and wait for it to be ready
    const FeatureflowProvider = await asyncFeatureflowProvider({
      apiKey: FF_KEY,
      config: {
        offline: false,
      },
      user: user
    });

    // Render the app once Featureflow is ready
    ReactDOM.render(
      <React.StrictMode>
        <FeatureflowProvider>
          <AppAsync />
        </FeatureflowProvider>
      </React.StrictMode>,
      document.getElementById('root')
    );
  } catch (error) {
    console.error('Failed to initialize Featureflow:', error);
    // Fallback: render app without Featureflow
    ReactDOM.render(
      <React.StrictMode>
        <div style={{ padding: '20px' }}>
          <h1>Error</h1>
          <p>Failed to initialize Featureflow. Please check your configuration.</p>
          <pre>{String(error)}</pre>
        </div>
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
};

// Initialize the app
initApp();

