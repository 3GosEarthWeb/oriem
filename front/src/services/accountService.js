import API from './api';

const getAccounts = async () => {
  try {
    const response = await API.get('/accounts');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const getAccountById = async (id) => {
  try {
    const response = await API.get(`/accounts/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const createAccount = async (accountData) => {
  try {
    const response = await API.post('/accounts', accountData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getAccounts,
  getAccountById,
  createAccount,
};
