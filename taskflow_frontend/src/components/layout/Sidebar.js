import React from 'react';
import { NavLink } from 'react-router-dom';
import './layout.css';

/**
 * PUBLIC_INTERFACE
 * Sidebar component: primary navigation
 */
export default function Sidebar() {
  return (
    <aside className="tf-sidebar">
      <nav className="tf-nav">
        <NavLink to="/" end className={({ isActive }) => 'tf-nav__item' + (isActive ? ' active' : '')}>
          Dashboard
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => 'tf-nav__item' + (isActive ? ' active' : '')}>
          Projects
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => 'tf-nav__item' + (isActive ? ' active' : '')}>
          Tasks
        </NavLink>
        <NavLink to="/team" className={({ isActive }) => 'tf-nav__item' + (isActive ? ' active' : '')}>
          Team
        </NavLink>
      </nav>
    </aside>
  );
}
