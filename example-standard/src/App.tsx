import React, { useEffect } from 'react';
import { FeatureflowProvider, useFeatureflow, useFeatures } from 'react-featureflow-client';

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

const FeatureDisplay: React.FC = () => {
  const featureflow = useFeatureflow();
  const features = useFeatures();

  // Subscribe to Featureflow events and log them
  useEffect(() => {
    const handleInit = () => {
      console.log('[Featureflow Event] INIT - Client has been initialized');
    };

    const handleLoaded = () => {
      console.log('[Featureflow Event] LOADED - Features loaded from server');
    };

    const handleLoadedFromCache = () => {
      console.log('[Featureflow Event] LOADED_FROM_CACHE - Features loaded from cache');
    };

    const handleError = (error: unknown) => {
      console.error('[Featureflow Event] ERROR - An error occurred:', error);
    };

    // Subscribe to events
    console.log('Subscribing to events');
    featureflow.on('INIT', handleInit);
    featureflow.on('LOADED', handleLoaded);
    featureflow.on('LOADED_FROM_CACHE', handleLoadedFromCache);
    featureflow.on('ERROR', handleError);

    // Cleanup: unsubscribe when component unmounts
    return () => {
      featureflow.off('INIT');
      featureflow.off('LOADED');
      featureflow.off('LOADED_FROM_CACHE');
      featureflow.off('ERROR');
    };
  }, [featureflow]);

  // Example feature key - replace with your actual feature key
  const featureKey = 'example-feature';
  const evaluation = featureflow.evaluate(featureKey);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>Featureflow Standard Provider Example</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        This example uses <code>FeatureflowProvider</code> which initializes 
        the client in useEffect (after mount). Use this when you need conditional rendering or dynamic initialization.
      </p>

      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Feature Evaluation</h2>
        <p>
          <strong>Feature:</strong> <code>{featureKey}</code>
        </p>
        <p>
          <strong>Status:</strong>{' '}
          {evaluation.isOn() && <span style={{ color: 'green' }}>✓ ON</span>}
          {evaluation.isOff() && <span style={{ color: 'red' }}>✗ OFF</span>}
        </p>
        <p>
          <strong>Variant:</strong> <code>{evaluation.value()}</code>
        </p>
      </div>

      <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h2>All Features</h2>
        {Object.keys(features).length === 0 ? (
          <p>No features loaded yet.</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {Object.keys(features).map(key => (
              <li key={key} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <code>{key}</code>: <strong>{features[key]}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <FeatureflowProvider
      apiKey={FF_API_KEY}
      config={{
        initOnCache: true,
      }}
      user={user}
    >
      <FeatureDisplay />
    </FeatureflowProvider>
  );
};

export default App;

