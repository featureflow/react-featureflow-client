import React from 'react';
import './index.css';
import HooksExample from './HooksExample';
/**
 * Example using asyncFeatureflowProvider - recommended for best UX
 * 
 * This approach initializes the Featureflow client BEFORE React renders,
 * ensuring features are available immediately and preventing any flicker.
 * 
 * Usage: Update index.tsx to use this App component instead of App.tsx
 */
const AppAsync: React.FC = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React Featureflow Client Example (Async Provider)</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        This example uses <code>asyncFeatureflowProvider</code> which initializes 
        the client before rendering, ensuring no flicker and features are available immediately.
      </p>
      
      <section style={{ marginBottom: '40px' }}>
        <h2>Hooks Example</h2>
        <p>This example demonstrates using the <code>useFeatureflow</code> and <code>useFeatures</code> hooks.</p>
        <HooksExample feature="example-feature" />
      </section>
    </div>
  );
};

export default AppAsync;

