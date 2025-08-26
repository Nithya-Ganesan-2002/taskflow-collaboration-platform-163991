import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../components/layout/layout.css';

/**
 * PUBLIC_INTERFACE
 * Login page with email/password form that calls AuthContext.login
 */
export default function Login() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      const msg = err?.response?.data?.detail || err?.message || 'Login failed';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="tf-main" style={{ maxWidth: 420, margin: '10vh auto' }}>
      <div className="tf-card">
        <h2 style={{ marginTop: 0 }}>Sign in to TaskFlow</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)', marginTop: 6 }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid var(--border)', marginTop: 6 }}
            />
          </div>
          {error ? <p style={{ color: 'crimson', marginTop: 0 }}>{error}</p> : null}
          <button type="submit" className="tf-btn" disabled={submitting} style={{ width: '100%' }}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
