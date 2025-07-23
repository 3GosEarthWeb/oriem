import API from './api';

const getAllUsers = async () => {
  try {
    const response = await API.get('/admin/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const updateUserRole = async (userId, roleData) => {
  try {
    const response = await API.put(`/admin/users/${userId}/role`, roleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const getLoanRequests = async () => {
  try {
    const response = await API.get('/admin/loans/requests');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const approveLoan = async (loanId) => {
  try {
    const response = await API.post(`/admin/loans/${loanId}/approve`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const rejectLoan = async (loanId) => {
  try {
    const response = await API.post(`/admin/loans/${loanId}/reject`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const getAuditLogs = async () => {
  try {
    const response = await API.get('/admin/audit-logs');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getAllUsers,
  updateUserRole,
  getLoanRequests,
  approveLoan,
  rejectLoan,
  getAuditLogs,
};
