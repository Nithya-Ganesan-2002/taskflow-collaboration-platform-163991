import React from 'react';
import './layout.css';
import { AuthContext } from '../../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Header component: top app bar with title and user actions.
 */
export default function Header() {
  return (
    <AuthContext.Consumer>
      {({ user, logout }) => (
        <header className="tf-header">
          <div className="tf-header__left">
            <span className="tf-header__logo">TaskFlow</span>
          </div>
          <div className="tf-header__right">
            {user ? <span className="tf-header__user">Hi, {user.name || user.email || 'User'}</span> : null}
            <button className="tf-btn tf-btn--ghost" onClick={logout} aria-label="Logout">Logout</button>
          </div>
        </header>
      )}
    </AuthContext.Consumer>
  );
}
