import React, { useState, useEffect } from 'react';
import { useFeatureflow, useFeatures } from 'react-featureflow-client';

interface Props {
  feature: string;
}

const HooksExample: React.FC<Props> = ({ feature }) => {
  const featureflow = useFeatureflow();
  const features = useFeatures();
  const [goalTracked, setGoalTracked] = useState(false);

  useEffect(() => {
    if (!goalTracked && featureflow.hasReceivedInitialResponse()) {
      featureflow.goal('hooks-page-viewed');
      setGoalTracked(true);
    }
  }, [featureflow, goalTracked]);

  const evaluation = featureflow.evaluate(feature);
  const isOn = evaluation.isOn();
  const isOff = evaluation.isOff();

  return (
    <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '4px' }}>
      <h3>Feature: <code>{feature}</code></h3>
      
      <div style={{ marginTop: '12px' }}>
        {isOn && <p style={{ color: 'green' }}>✓ {feature} is ON</p>}
        {isOff && <p style={{ color: 'red' }}>✗ {feature} is OFF</p>}
      </div>

      <div style={{ marginTop: '16px' }}>
        <h4>All Features:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {Object.keys(features).map(key => (
            <li key={key} style={{ padding: '4px 0' }}>
              <code>{key}</code>: {features[key]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HooksExample;
