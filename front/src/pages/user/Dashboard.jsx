import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import transactionService from '../../services/transactionService';
import accountService from '../../services/accountService';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch accounts linked to this user
        const accountsData = await accountService.getAccountsByUserId(user.id);
        setAccounts(accountsData);

        // Fetch recent transactions (e.g., last 5)
        const transactionsData = await transactionService.getRecentTransactions(user.id, 5);
        setRecentTransactions(transactionsData);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <main className="dashboard-container">
      <h1>Welcome back, {user?.firstName || user?.email}!</h1>

      <section className="accounts-summary">
        <h2>Your Accounts</h2>
        {accounts.length === 0 ? (
          <p>You have no linked accounts.</p>
        ) : (
          <ul>
            {accounts.map((acc) => (
              <li key={acc.id} className="account-card">
                <div>Account Number: {acc.accountNumber}</div>
                <div>Type: {acc.accountType}</div>
                <div>Balance: ${acc.balance.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="recent-transactions">
        <h2>Recent Transactions</h2>
        {recentTransactions.length === 0 ? (
          <p>No recent transactions found.</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount ($)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{new Date(txn.date).toLocaleDateString()}</td>
                  <td>{txn.description}</td>
                  <td
                    className={txn.amount < 0 ? 'negative' : 'positive'}
                  >
                    {txn.amount.toFixed(2)}
                  </td>
                  <td>{txn.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
