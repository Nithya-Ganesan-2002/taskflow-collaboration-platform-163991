import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './layout.css';

/**
 * PUBLIC_INTERFACE
 * AppLayout wraps protected pages into the app frame.
 */
export default function AppLayout({ children }) {
  return (
    <div className="tf-app">
      <Sidebar />
      <Header />
      <main className="tf-main">{children}</main>
    </div>
  );
}
