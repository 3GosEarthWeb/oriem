// src/pages/admin/LoanManagementPage.jsx

import React, { useEffect, useState } from 'react';

const LoanManagementPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await fetch('/api/admin/loans'); // Replace with your API endpoint
        if (!res.ok) throw new Error('Failed to fetch loans');
        const data = await res.json();
        setLoans(data);
      } catch (err) {
        setError(err.message || 'Error fetching loans');
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const handleLoanAction = async (loanId, action) => {
    // action: 'approve' or 'reject'
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/loans/${loanId}/${action}`, {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Action failed');
      // Update loan status locally
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan.id === loanId ? { ...loan, status: action === 'approve' ? 'Approved' : 'Rejected' } : loan
        )
      );
    } catch (err) {
      alert(err.message || 'Failed to update loan');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <div>Loading loans...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="loan-management-page">
      <h1>Loan Management</h1>
      {loans.length === 0 ? (
        <p>No loan applications found.</p>
      ) : (
        <table className="loan-table">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>{loan.id}</td>
                <td>{loan.customerName}</td>
                <td>${loan.amount.toFixed(2)}</td>
                <td>{loan.status}</td>
                <td>{new Date(loan.appliedAt).toLocaleDateString()}</td>
                <td>
                  {loan.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleLoanAction(loan.id, 'approve')}
                        disabled={actionLoading}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleLoanAction(loan.id, 'reject')}
                        disabled={actionLoading}
                        style={{ marginLeft: '10px', color: 'red' }}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>No actions available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoanManagementPage;
