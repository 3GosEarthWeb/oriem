import React, { useEffect, useState } from 'react';
import transactionService from '../../services/transactionService';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  // Example: Fetch 10 transactions per page
  const PAGE_SIZE = 10;

  const fetchTransactions = async (pageNumber) => {
    setLoading(true);
    setError('');
    try {
      const response = await transactionService.getTransactions({
        page: pageNumber,
        pageSize: PAGE_SIZE,
      });
      // Assuming API returns { data: [...], total: number }
      if (pageNumber === 1) {
        setTransactions(response.data);
      } else {
        setTransactions((prev) => [...prev, ...response.data]);
      }
      // Check if more pages available
      setHasMore(response.data.length === PAGE_SIZE);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTransactions(nextPage);
  };

  return (
    <div className="transactions-page container mx-auto p-4 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {loading && page === 1 ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
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

      {hasMore && !loading && (
        <div className="mt-4 text-center">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}

      {loading && page > 1 && <p className="mt-4">Loading more transactions...</p>}
    </div>
  );
};

export default TransactionsPage;
