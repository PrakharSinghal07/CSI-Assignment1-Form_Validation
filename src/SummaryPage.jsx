import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SummaryPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No data submitted</p>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Submitted Details</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}>
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  );
}

export default SummaryPage;
