import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import loanService from '../../services/loanService';

const schema = yup.object().shape({
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Loan amount is required'),
  termMonths: yup
    .number()
    .typeError('Term must be a number')
    .positive('Term must be positive')
    .integer('Term must be an integer')
    .required('Loan term is required'),
  purpose: yup.string().max(255, 'Purpose too long').required('Purpose is required'),
});

const LoanPage = () => {
  const [loading, setLoading] = useState(false);
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  // Fetch user loans on mount
  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await loanService.getUserLoans();
        setLoans(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch loans');
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, []);

  const onSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setSuccessMsg('');
    try {
      await loanService.applyLoan(formData);
      setSuccessMsg('Loan application submitted successfully.');
      reset();
      // Refresh loans list
      const updatedLoans = await loanService.getUserLoans();
      setLoans(updatedLoans);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply for loan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loan-page container mx-auto p-4 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Your Loans</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMsg}
        </div>
      )}

      {loading && loans.length === 0 ? (
        <p>Loading loans...</p>
      ) : loans.length === 0 ? (
        <p>You have no active loans.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 mb-8">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left">Loan ID</th>
              <th className="border border-gray-300 p-2 text-left">Amount</th>
              <th className="border border-gray-300 p-2 text-left">Term (months)</th>
              <th className="border border-gray-300 p-2 text-left">Status</th>
              <th className="border border-gray-300 p-2 text-left">Applied On</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-2">{loan.id}</td>
                <td className="border border-gray-300 p-2">
                  {loan.amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}
                </td>
                <td className="border border-gray-300 p-2">{loan.termMonths}</td>
                <td className="border border-gray-300 p-2 capitalize">{loan.status}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(loan.appliedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 className="text-xl font-semibold mb-2">Apply for a New Loan</h3>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label htmlFor="amount" className="block font-medium mb-1">
            Loan Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            {...register('amount')}
            className={`w-full p-2 border rounded ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter loan amount"
            disabled={loading}
          />
          {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="termMonths" className="block font-medium mb-1">
            Loan Term (Months)
          </label>
          <input
            id="termMonths"
            type="number"
            {...register('termMonths')}
            className={`w-full p-2 border rounded ${
              errors.termMonths ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter loan term in months"
            disabled={loading}
          />
          {errors.termMonths && (
            <p className="text-red-600 text-sm mt-1">{errors.termMonths.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="purpose" className="block font-medium mb-1">
            Purpose
          </label>
          <textarea
            id="purpose"
            rows="3"
            {...register('purpose')}
            className={`w-full p-2 border rounded ${
              errors.purpose ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Briefly describe the purpose of the loan"
            disabled={loading}
          ></textarea>
          {errors.purpose && <p className="text-red-600 text-sm mt-1">{errors.purpose.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Apply'}
        </button>
      </form>
    </div>
  );
};

export default LoanPage;
