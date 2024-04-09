import axios from 'axios';
import { USER_URL } from './config.js';
export const getUser = async endpoint => {
  try {
    const bearerToken = localStorage.getItem('token');
    const users = await axios.get(`${USER_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return users;
  } catch (err) {
    throw new Error(err);
  }
};
export const deleteUser = async (endpoint, id) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.delete(`${USER_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data: {
        admin_id: id,
      },
    });
  } catch (err) {
    throw new Error(err);
  }
};
export const createUser = async (endpoint, user) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(`${USER_URL}${endpoint}`, user, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
export const updateUser = async (endpoint, user) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(`${USER_URL}${endpoint}`, user, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
export const uploadUserByFile = async (endpoint, file) => {
  try {
    const bearerToken = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);
    await axios.post(`${USER_URL}${endpoint}`, formData, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    throw new Error(err.message);
  }
};
