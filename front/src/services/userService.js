import API from './api';

const getProfile = async () => {
  try {
    const response = await API.get('/users/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const updateProfile = async (profileData) => {
  try {
    const response = await API.put('/users/profile', profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getProfile,
  updateProfile,
};
