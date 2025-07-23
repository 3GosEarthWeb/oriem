// src/pages/admin/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Example: fetch admin dashboard stats (replace with real API)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // TODO: Replace with your API call to fetch admin stats
        const response = await fetch('/api/admin/dashboard-stats');
        if (!response.ok) throw new Error('Failed to fetch stats');
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading admin dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* Example stats display */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{stats?.totalUsers ?? 0}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Loans</h3>
          <p>{stats?.pendingLoans ?? 0}</p>
        </div>
        <div className="stat-card">
          <h3>Transactions Today</h3>
          <p>{stats?.transactionsToday ?? 0}</p>
        </div>
        {/* Add more stat cards as needed */}
      </div>
    </div>
  );
};

export default AdminDashboard;
