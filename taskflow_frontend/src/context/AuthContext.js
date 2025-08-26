import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/client';

/**
 * PUBLIC_INTERFACE
 * AuthContext provides authentication/session state and actions.
 * - login: authenticate and persist token
 * - logout: clear session and redirect to login
 * - user: current user object (decoded from token or fetched)
 * - token: current JWT token
 * - isAuthenticated: boolean
 */
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async (_email, _password) => {},
  logout: () => {},
});

/**
 * PUBLIC_INTERFACE
 * AuthProvider wraps the app and initializes/restores session from storage.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('tf_token'));
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('tf_user');
    try {
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  // Derive isAuthenticated
  const isAuthenticated = Boolean(token);

  // Attempt to decode token for basic user info if not already stored
  useEffect(() => {
    if (token && !user) {
      try {
        const decoded = jwtDecode(token);
        const basicUser = {
          id: decoded.sub || decoded.user_id || null,
          email: decoded.email || null,
          name: decoded.name || decoded.username || null,
          roles: decoded.roles || [],
        };
        setUser(basicUser);
        localStorage.setItem('tf_user', JSON.stringify(basicUser));
      } catch {
        // invalid token, clear it
        localStorage.removeItem('tf_token');
        setToken(null);
      }
    }
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  // PUBLIC_INTERFACE
  const login = useCallback(async (email, password) => {
    // Example login implementation; adjust endpoint as backend evolves.
    // Expecting backend to return { access_token: string, token_type: "bearer", user?: object }
    const res = await api.post('/auth/login', { email, password });
    const accessToken = res?.data?.access_token;
    const userObj = res?.data?.user;

    if (!accessToken) {
      throw new Error('Login failed: access token missing');
    }

    localStorage.setItem('tf_token', accessToken);
    setToken(accessToken);

    const nextUser = userObj || (() => {
      try { return jwtDecode(accessToken); } catch { return null; }
    })();

    if (nextUser) {
      setUser(nextUser);
      localStorage.setItem('tf_user', JSON.stringify(nextUser));
    }

    return true;
  }, []);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    localStorage.removeItem('tf_token');
    localStorage.removeItem('tf_user');
    setToken(null);
    setUser(null);
    window.location.assign('/login');
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    token,
    login,
    logout,
  }), [isAuthenticated, user, token, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
