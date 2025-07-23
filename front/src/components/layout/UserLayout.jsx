import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const UserLayout = () => {
  return (
    <div className="layout-container">
      <Sidebar role="customer" />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;

