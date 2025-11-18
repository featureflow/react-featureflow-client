import React from 'react';
import { useFeatureflow, useFeatures } from 'react-featureflow-client';

const App: React.FC = () => {
  const featureflow = useFeatureflow();
  const features = useFeatures();

  // Example feature key - replace with your actual feature key
  const featureKey = 'example-feature';
  const evaluation = featureflow.evaluate(featureKey);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>Featureflow Async Provider Example</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        This example uses <code>asyncFeatureflowProvider</code> which initializes 
        the client before React renders, ensuring no flicker and features are available immediately.
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

export default App;

