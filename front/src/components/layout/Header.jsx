import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="layout-header">
      <button className="mobile-toggle" onClick={toggleSidebar}>☰</button>
      <div className="header-actions">
        <button className="theme-toggle">🌗</button>
        <button className="notification-icon">🔔</button>
      </div>
    </header>
  );
};

export default Header;
