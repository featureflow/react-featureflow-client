import React, { useState, useEffect } from 'react';
import { useFeatureflow } from 'react-featureflow-client';
import type { FeatureflowUser } from 'react-featureflow-client';

interface Props {
  defaultUser: FeatureflowUser;
}

const UserEditor: React.FC<Props> = ({ defaultUser }) => {
  const featureflow = useFeatureflow();
  const [userJson, setUserJson] = useState(() => JSON.stringify(defaultUser, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  // Get current user from featureflow client
  const currentUser = featureflow.getUser?.() || defaultUser;

  // Validate JSON as user types
  useEffect(() => {
    try {
      const parsed = JSON.parse(userJson);
      if (!parsed.id || typeof parsed.id !== 'string') {
        setError('User must have an "id" property of type string');
      } else {
        setError(null);
      }
    } catch (e) {
      setError(`Invalid JSON: ${e instanceof Error ? e.message : String(e)}`);
    }
  }, [userJson]);

  const handleUpdateUser = async () => {
    try {
      const newUser: FeatureflowUser = JSON.parse(userJson);
      
      if (!newUser.id || typeof newUser.id !== 'string') {
        setError('User must have an "id" property of type string');
        return;
      }

      setIsUpdating(true);
      setError(null);

      await featureflow.updateUser(newUser);
      
      setLastUpdate(`✅ User updated at ${new Date().toLocaleTimeString()}`);
      console.log('User updated successfully:', newUser);
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(`Failed to update user: ${message}`);
      console.error('Failed to update user:', e);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReset = () => {
    setUserJson(JSON.stringify(defaultUser, null, 2));
    setError(null);
    setLastUpdate(null);
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      background: '#fafafa'
    }}>
      <h3 style={{ marginTop: 0 }}>👤 Edit User Context</h3>
      <p style={{ color: '#666', fontSize: '14px' }}>
        Edit the user JSON below and click "Update User" to see how feature flags change based on user attributes.
      </p>

      {/* Current User Display */}
      <div style={{ 
        marginBottom: '16px', 
        padding: '12px', 
        background: '#e3f2fd', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>Current User ID:</strong> <code>{currentUser.id}</code>
        {currentUser.attributes && Object.keys(currentUser.attributes).length > 0 && (
          <div style={{ marginTop: '8px' }}>
            <strong>Attributes:</strong>
            <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
              {Object.entries(currentUser.attributes).map(([key, value]) => (
                <li key={key}>
                  <code>{key}</code>: {Array.isArray(value) ? value.join(', ') : String(value)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* JSON Editor */}
      <textarea
        value={userJson}
        onChange={(e) => setUserJson(e.target.value)}
        style={{
          width: '100%',
          height: '200px',
          fontFamily: 'monospace',
          fontSize: '13px',
          padding: '12px',
          border: error ? '2px solid #f44336' : '1px solid #ccc',
          borderRadius: '4px',
          resize: 'vertical',
          boxSizing: 'border-box',
          background: '#fff'
        }}
        spellCheck={false}
      />

      {/* Error Display */}
      {error && (
        <div style={{ 
          marginTop: '8px', 
          padding: '10px', 
          background: '#ffebee', 
          color: '#c62828',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          ❌ {error}
        </div>
      )}

      {/* Success Message */}
      {lastUpdate && !error && (
        <div style={{ 
          marginTop: '8px', 
          padding: '10px', 
          background: '#e8f5e9', 
          color: '#2e7d32',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {lastUpdate}
        </div>
      )}

      {/* Buttons */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
        <button
          type="button"
          onClick={handleUpdateUser}
          disabled={!!error || isUpdating}
          style={{
            padding: '10px 20px',
            background: error || isUpdating ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: error || isUpdating ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isUpdating ? '⏳ Updating...' : '🔄 Update User'}
        </button>
        <button
          type="button"
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            background: '#f5f5f5',
            color: '#333',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Reset to Default
        </button>
      </div>

      {/* Example Users */}
      <div style={{ marginTop: '16px' }}>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
          <strong>Quick presets:</strong>
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setUserJson(JSON.stringify({
              id: 'gold-user',
              attributes: { tier: 'gold', country: 'australia' }
            }, null, 2))}
            style={presetButtonStyle}
          >
            Gold User
          </button>
          <button
            type="button"
            onClick={() => setUserJson(JSON.stringify({
              id: 'premium-user',
              attributes: { tier: 'premium', country: 'usa', beta: true }
            }, null, 2))}
            style={presetButtonStyle}
          >
            Premium User
          </button>
          <button
            type="button"
            onClick={() => setUserJson(JSON.stringify({
              id: 'free-user',
              attributes: { tier: 'free', country: 'uk' }
            }, null, 2))}
            style={presetButtonStyle}
          >
            Free User
          </button>
          <button
            type="button"
            onClick={() => setUserJson(JSON.stringify({
              id: 'beta-tester',
              attributes: { tier: 'gold', beta: true, roles: ['tester', 'developer'] }
            }, null, 2))}
            style={presetButtonStyle}
          >
            Beta Tester
          </button>
        </div>
      </div>
    </div>
  );
};

const presetButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  background: '#fff',
  color: '#666',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

export default UserEditor;

