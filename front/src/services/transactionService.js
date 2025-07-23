import API from './api';

const getTransactions = async () => {
  try {
    const response = await API.get('/transactions');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const getTransactionById = async (id) => {
  try {
    const response = await API.get(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const transferFunds = async (transferData) => {
  try {
    const response = await API.post('/transactions/transfer', transferData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const deposit = async (depositData) => {
  try {
    const response = await API.post('/transactions/deposit', depositData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const withdraw = async (withdrawData) => {
  try {
    const response = await API.post('/transactions/withdraw', withdrawData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getTransactions,
  getTransactionById,
  transferFunds,
  deposit,
  withdraw,
};
