import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * ProtectedRoute guards nested routes and redirects to /login if not authenticated.
 */
export default function ProtectedRoute() {
  return (
    <AuthContext.Consumer>
      {({ isAuthenticated }) => (isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />)}
    </AuthContext.Consumer>
  );
}
