import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import accountService from '../../services/accountService';
import transactionService from '../../services/transactionService';

const AccountDetails = () => {
  const { id } = useParams(); // account id
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [loadingTx, setLoadingTx] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      setLoadingAccount(true);
      setError('');
      try {
        const data = await accountService.getAccountById(id);
        setAccount(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch account details.');
      } finally {
        setLoadingAccount(false);
      }
    };

    const fetchTransactions = async () => {
      setLoadingTx(true);
      try {
        const txs = await transactionService.getTransactions({ accountId: id, page: 1, pageSize: 10 });
        setTransactions(txs.data || txs);
      } catch {
        // silently fail or set error if you want
      } finally {
        setLoadingTx(false);
      }
    };

    fetchAccount();
    fetchTransactions();
  }, [id]);

  if (loadingAccount) return <p>Loading account details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!account) return <p>Account not found.</p>;

  return (
    <div className="account-details container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Account Details</h2>

      <div className="mb-6 p-4 border rounded shadow-sm bg-white">
        <p><strong>Account Number:</strong> {account.accountNumber}</p>
        <p><strong>Account Type:</strong> {account.accountType}</p>
        <p>
          <strong>Balance:</strong>{' '}
          {account.balance.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
        </p>
        <p><strong>Account Holder:</strong> {account.accountHolderName}</p>
        <p><strong>Status:</strong> {account.status}</p>
        <p><strong>Opened On:</strong> {new Date(account.openedDate).toLocaleDateString()}</p>
      </div>

      <h3 className="text-xl font-semibold mb-3">Recent Transactions</h3>

      {loadingTx ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No recent transactions found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Date</th>
              <th className="border border-gray-300 p-2 text-left">Type</th>
              <th className="border border-gray-300 p-2 text-right">Amount</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{new Date(tx.date).toLocaleString()}</td>
                <td className="border border-gray-300 p-2 capitalize">{tx.type}</td>
                <td className="border border-gray-300 p-2 text-right">
                  {tx.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                </td>
                <td className="border border-gray-300 p-2">{tx.status}</td>
                <td className="border border-gray-300 p-2">{tx.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccountDetails;
