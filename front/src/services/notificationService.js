import API from './api';

const getNotifications = async () => {
  try {
    const response = await API.get('/notifications');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const markAsRead = async (notificationId) => {
  try {
    const response = await API.post(`/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

const deleteNotification = async (notificationId) => {
  try {
    const response = await API.delete(`/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default {
  getNotifications,
  markAsRead,
  deleteNotification,
};
