import React from 'react';
import ReactDOM from 'react-dom';
import { asyncFeatureflowProvider, FeatureflowProvider } from 'react-featureflow-client';
import type { FeatureflowUser } from 'react-featureflow-client';
import './index.css';
import HooksExample from './HooksExample';
import UserEditor from './UserEditor';

const FF_KEY = 'js-env-bbb659960a3344c5a31681282c0c4bdf';
const defaultUser: FeatureflowUser = {
  id: 'user-123',
  attributes: {
    tier: 'gold',
    country: 'australia',
    roles: ['role1', 'role2']
  }
};

// Check URL hash to determine which provider mode to use
const isAsyncMode = window.location.hash === '#async';

/**
 * Navigation component to switch between provider modes
 */
const ModeSelector: React.FC<{ currentMode: 'standard' | 'async' }> = ({ currentMode }) => {
  const switchMode = (mode: 'standard' | 'async') => {
    window.location.hash = mode === 'async' ? '#async' : '';
    window.location.reload();
  };

  return (
    <div style={{ 
      display: 'flex', 
      gap: '8px', 
      marginBottom: '24px',
      padding: '16px',
      background: '#f5f5f5',
      borderRadius: '8px'
    }}>
      <button
        type="button"
        onClick={() => switchMode('standard')}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: currentMode === 'standard' ? 'bold' : 'normal',
          background: currentMode === 'standard' ? '#007bff' : '#e0e0e0',
          color: currentMode === 'standard' ? 'white' : '#333',
        }}
      >
        Standard Provider
      </button>
      <button
        type="button"
        onClick={() => switchMode('async')}
        style={{
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: currentMode === 'async' ? 'bold' : 'normal',
          background: currentMode === 'async' ? '#007bff' : '#e0e0e0',
          color: currentMode === 'async' ? 'white' : '#333',
        }}
      >
        Async Provider
      </button>
    </div>
  );
};

/**
 * Main app content (same for both modes)
 */
const AppContent: React.FC<{ mode: 'standard' | 'async' }> = ({ mode }) => (
  <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
    <h1>React Featureflow Client Example</h1>
    
    <ModeSelector currentMode={mode} />
    
    <div style={{ 
      padding: '16px', 
      marginBottom: '24px',
      background: mode === 'async' ? '#e8f5e9' : '#fff3e0',
      borderRadius: '8px',
      border: `1px solid ${mode === 'async' ? '#a5d6a7' : '#ffcc80'}`
    }}>
      <h3 style={{ margin: '0 0 8px 0' }}>
        {mode === 'async' ? '⚡ Async Provider Mode' : '🔄 Standard Provider Mode'}
      </h3>
      <p style={{ margin: 0, color: '#666' }}>
        {mode === 'async' 
          ? 'Using asyncFeatureflowProvider — client initialized BEFORE React renders. No flicker, features available immediately.'
          : 'Using FeatureflowProvider — client initialized in useEffect AFTER mount. Simple setup, but may cause brief flicker.'}
      </p>
    </div>

    {/* User Editor Section */}
    <section style={{ marginBottom: '40px' }}>
      <h2>User Context Editor</h2>
      <p>Update the user context to see how feature flags change based on user attributes.</p>
      <UserEditor defaultUser={defaultUser} />
    </section>

    {/* Features Display Section */}
    <section style={{ marginBottom: '40px' }}>
      <h2>Feature Flags</h2>
      <p>This demonstrates using the <code>useFeatureflow</code> and <code>useFeatures</code> hooks.</p>
      <HooksExample feature="example-feature" />
    </section>

    {/* Code Examples Section */}
    <section style={{ 
      padding: '16px', 
      background: '#f9f9f9', 
      borderRadius: '8px',
      fontSize: '14px',
      color: '#666'
    }}>
      <h3 style={{ marginTop: 0 }}>Code Examples</h3>
      <p>
        <strong>Standard Provider:</strong> Wrap your app with <code>&lt;FeatureflowProvider&gt;</code>
      </p>
      <pre style={{ background: '#eee', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`<FeatureflowProvider apiKey={API_KEY} user={user}>
  <App />
</FeatureflowProvider>`}
      </pre>
      
      <p>
        <strong>Async Provider:</strong> Initialize before render
      </p>
      <pre style={{ background: '#eee', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`const Provider = await asyncFeatureflowProvider({
  apiKey: API_KEY,
  user: user
});

ReactDOM.render(
  <Provider><App /></Provider>,
  document.getElementById('root')
);`}
      </pre>

      <p>
        <strong>Update User:</strong> Change user context after initialization
      </p>
      <pre style={{ background: '#eee', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`const featureflow = useFeatureflow();

// Update user context (re-evaluates features)
await featureflow.updateUser({
  id: 'new-user-id',
  attributes: { tier: 'premium', beta: true }
});`}
      </pre>
    </section>
  </div>
);

/**
 * Initialize app based on mode
 */
const initApp = async () => {
  const rootElement = document.getElementById('root');

  if (isAsyncMode) {
    // ASYNC MODE: Initialize Featureflow before rendering
    try {
      const AsyncProvider = await asyncFeatureflowProvider({
        apiKey: FF_KEY,
        config: { offline: false },
        user: defaultUser
      });

      ReactDOM.render(
        <React.StrictMode>
          <AsyncProvider>
            <AppContent mode="async" />
          </AsyncProvider>
        </React.StrictMode>,
        rootElement
      );
    } catch (error) {
      console.error('Failed to initialize Featureflow:', error);
      ReactDOM.render(
        <div style={{ padding: '20px' }}>
          <h1>Error</h1>
          <p>Failed to initialize Featureflow. Check console for details.</p>
          <ModeSelector currentMode="async" />
        </div>,
        rootElement
      );
    }
  } else {
    // STANDARD MODE: Render immediately, client initializes in useEffect
    ReactDOM.render(
      <React.StrictMode>
        <FeatureflowProvider
          apiKey={FF_KEY}
          config={{ offline: false }}
          user={defaultUser}
        >
          <AppContent mode="standard" />
        </FeatureflowProvider>
      </React.StrictMode>,
      rootElement
    );
  }
};

initApp();
