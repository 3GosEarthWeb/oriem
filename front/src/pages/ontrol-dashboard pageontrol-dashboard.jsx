import React, { useState } from 'react';

const pages = [
  {
    name: 'Login',
    status: 'Built',
    description: 'User login page',
    link: '/login',
  },
  {
    name: 'Signup',
    status: 'Built',
    description: 'User registration',
    link: '/signup',
  },
  {
    name: 'Dashboard',
    status: 'Built',
    description: 'Main user dashboard',
    link: '/dashboard',
  },
  {
    name: 'Account Details',
    status: 'In Progress',
    description: 'View user account info',
    link: '/account-details',
  },
  {
    name: 'Fund Transfer',
    status: 'Not Started',
    description: 'Transfer funds to other accounts',
    link: '/fund-transfer',
  },
  {
    name: 'Loan Application',
    status: 'Not Started',
    description: 'Apply for loans',
    link: '/loan-application',
  },
  {
    name: 'Transaction History',
    status: 'Built',
    description: 'List of user transactions',
    link: '/transactions',
  },
  {
    name: 'Profile Settings',
    status: 'Built',
    description: 'User profile and settings',
    link: '/profile',
  },
  {
    name: 'Admin User Management',
    status: 'In Progress',
    description: 'Admin controls for users',
    link: '/admin/users',
  },
  {
    name: 'Loan Management',
    status: 'Not Started',
    description: 'Admin loan approval & tracking',
    link: '/admin/loans',
  },
];

const statusColors = {
  Built: 'green',
  'In Progress': 'orange',
  'Not Started': 'red',
};

export default function ControlDashboard() {
  const [search, setSearch] = useState('');

  // Filter pages based on search term
  const filteredPages = pages.filter(
    p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>ORiem Capital Control Dashboard</h1>

      <input
        type="text"
        placeholder="Search pages..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '20px',
          width: '100%',
          maxWidth: 400,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc',
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Page Name</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Description</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #ddd', textAlign: 'left' }}>Link</th>
          </tr>
        </thead>
        <tbody>
          {filteredPages.length === 0 && (
            <tr>
              <td colSpan="4" style={{ padding: '12px', textAlign: 'center' }}>
                No pages found
              </td>
            </tr>
          )}
          {filteredPages.map(page => (
            <tr key={page.name} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px' }}>{page.name}</td>
              <td style={{ padding: '12px', color: statusColors[page.status], fontWeight: 'bold' }}>{page.status}</td>
              <td style={{ padding: '12px' }}>{page.description}</td>
              <td style={{ padding: '12px' }}>
                {page.status === 'Built' ? (
                  <a href={page.link} target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3' }}>
                    Open
                  </a>
                ) : (
                  <span style={{ color: '#999' }}>N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
