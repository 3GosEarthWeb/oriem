// src/pages/admin/AuditLogsPage.jsx

import React, { useEffect, useState } from 'react';

const AuditLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      try {
        // TODO: Replace with your real API endpoint
        const response = await fetch('/api/admin/audit-logs');
        if (!response.ok) throw new Error('Failed to fetch audit logs');
        const data = await response.json();
        setLogs(data);
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, []);

  if (loading) return <div>Loading audit logs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="audit-logs-page">
      <h1>Audit Logs</h1>
      {logs.length === 0 ? (
        <p>No audit logs found.</p>
      ) : (
        <table className="audit-logs-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Action</th>
              <th>Timestamp</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
                <td>{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AuditLogsPage;
