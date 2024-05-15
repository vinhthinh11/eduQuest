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
    const result = await axios.delete(`${USER_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data: {
        ...id,
      },
    });
    return result;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
export const createUser = async (endpoint, user) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(`${USER_URL}/${endpoint}`, user, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    throw err;
  }
};
export const updateUser = async (endpoint, user) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.put(`${USER_URL}${endpoint}`, user, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data.message);
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
export const getMe = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const users = await axios.get(`${USER_URL}${'/me'}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return users;
  } catch (err) {
    throw new Error(err);
  }
};
export const forgetPassowrd = async email => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(`${USER_URL}${'/forget-password'}`, email, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    throw err;
  }
};
export const sentVerifyOtp = async data => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(`${USER_URL}${'/verify-otp-and-reset-password'}`, data, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    throw err;
  }
};
