import React from 'react';
import '../components/layout/layout.css';

/**
 * PUBLIC_INTERFACE
 * Dashboard shell: provides a simple overview placeholder.
 */
export default function Dashboard() {
  return (
    <div className="tf-card">
      <h2 style={{ marginTop: 0 }}>Dashboard</h2>
      <p>Welcome to TaskFlow. Your projects and tasks will appear here.</p>
    </div>
  );
}
