import API from './api';

const getUserLoans = async () => {
  try {
    const response = await API.get('/loans/my');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const applyForLoan = async (loanData) => {
  try {
    const response = await API.post('/loans/apply', loanData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const getLoanById = async (id) => {
  try {
    const response = await API.get(`/loans/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const cancelLoan = async (id) => {
  try {
    const response = await API.post(`/loans/${id}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getUserLoans,
  applyForLoan,
  getLoanById,
  cancelLoan,
};
