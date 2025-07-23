import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Sidebar = ({ role, onToggle }) => {
  const { logout } = useContext(AuthContext);

  const navItems = {
    admin: [
      { path: '/admin/dashboard', label: 'Dashboard' },
      { path: '/admin/users', label: 'User Management' },
      { path: '/admin/loans', label: 'Loan Management' },
      { path: '/admin/audit-logs', label: 'Audit Logs' },
    ],
    customer: [
      { path: '/dashboard', label: 'Dashboard' },
      { path: '/transfer', label: 'Transfer Funds' },
      { path: '/transactions', label: 'Transactions' },
      { path: '/loan', label: 'Loan Application' },
    ],
  };

  const links = navItems[role] || [];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3 className="sidebar-title">ORiem {role === 'admin' ? 'Admin' : 'Banking'}</h3>
        {onToggle && (
          <button className="close-btn" onClick={onToggle}>
            ✖
          </button>
        )}
      </div>

      <nav>
        <ul>
          {links.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'nav-link active' : 'nav-link'
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <hr />
        <button className="nav-link logout-btn" onClick={logout}>
          🔒 Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
