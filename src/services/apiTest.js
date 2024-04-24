import axios from 'axios';
import { USER_URL } from './config.js';

export const createTest = async (endpoint, test) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(`${USER_URL}/${endpoint}`, test, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err.response.data);
    throw new Error(err.response.data.error);
  }
};
export const getTestDetail = async endpoint => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.get(`${USER_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err.response.data);
    throw new Error(err.response.data.error);
  }
};
export const updateTest = async (endpoint, data) => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.put(`${USER_URL}/${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err.response.data);
    throw new Error(err.response.data.error);
  }
};
