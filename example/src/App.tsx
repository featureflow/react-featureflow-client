import React from 'react';
import { FeatureflowProvider } from 'react-featureflow-client';
import './index.css';
import HooksExample from './HooksExample';

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
 * Example using FeatureflowProvider (standard approach)
 * 
 * This approach initializes the Featureflow client in useEffect (after mount).
 * Use this when you need conditional rendering or dynamic initialization.
 * 
 * For best UX (no flicker), consider using asyncFeatureflowProvider instead.
 * See indexAsync.tsx and AppAsync.tsx for an example.
 */
const App: React.FC = () => {
  return (
    <FeatureflowProvider
      apiKey={FF_KEY}
      config={{
        offline: false,
      }}
      user={user}
    >
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1>React Featureflow Client Example</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>
          This example uses <code>FeatureflowProvider</code> which initializes 
          the client after mount. For no-flicker initialization, see the async provider example.
        </p>
        
        <section style={{ marginBottom: '40px' }}>
          <h2>Hooks Example</h2>
          <p>This example demonstrates using the <code>useFeatureflow</code> and <code>useFeatures</code> hooks.</p>
          <HooksExample feature="example-feature" />
        </section>
      </div>
    </FeatureflowProvider>
  );
};

export default App;
