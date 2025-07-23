import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="layout-container">
      {showSidebar && <Sidebar role="admin" onToggle={() => setShowSidebar(false)} />}
      <div className="layout-main">
        <Header toggleSidebar={() => setShowSidebar(!showSidebar)} />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
