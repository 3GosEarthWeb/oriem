import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import transactionService from '../../services/transactionService';

// Validation schema
const schema = yup.object().shape({
  fromAccount: yup.string().required('Source account is required'),
  toAccount: yup.string().required('Destination account is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  note: yup.string().max(255, 'Note cannot exceed 255 characters').nullable(),
});

const TransferPage = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setServerError('');
    setSuccessMsg('');

    try {
      await transactionService.transferFunds({
        fromAccount: data.fromAccount,
        toAccount: data.toAccount,
        amount: data.amount,
        note: data.note || '',
      });
      setSuccessMsg('Transfer successful!');
      reset();
    } catch (error) {
      // Adjust this depending on your API error format
      setServerError(error.response?.data?.message || 'Failed to transfer funds.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-page container mx-auto p-4 max-w-lg">
      <h2 className="text-2xl font-semibold mb-4">Transfer Funds</h2>

      {serverError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
          {serverError}
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 border border-green-300 rounded">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-4">
          <label htmlFor="fromAccount" className="block font-medium mb-1">
            From Account
          </label>
          <input
            id="fromAccount"
            type="text"
            {...register('fromAccount')}
            className={`w-full p-2 border rounded ${
              errors.fromAccount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your source account number"
            disabled={loading}
          />
          {errors.fromAccount && (
            <p className="text-red-600 text-sm mt-1">{errors.fromAccount.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="toAccount" className="block font-medium mb-1">
            To Account
          </label>
          <input
            id="toAccount"
            type="text"
            {...register('toAccount')}
            className={`w-full p-2 border rounded ${
              errors.toAccount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter recipient's account number"
            disabled={loading}
          />
          {errors.toAccount && (
            <p className="text-red-600 text-sm mt-1">{errors.toAccount.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block font-medium mb-1">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            {...register('amount')}
            className={`w-full p-2 border rounded ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter amount to transfer"
            disabled={loading}
          />
          {errors.amount && (
            <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="note" className="block font-medium mb-1">
            Note (optional)
          </label>
          <textarea
            id="note"
            rows="3"
            {...register('note')}
            className={`w-full p-2 border rounded ${
              errors.note ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Add a note for the recipient"
            disabled={loading}
          ></textarea>
          {errors.note && (
            <p className="text-red-600 text-sm mt-1">{errors.note.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Transfer'}
        </button>
      </form>
    </div>
  );
};

export default TransferPage;
