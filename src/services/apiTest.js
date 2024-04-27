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
export const studentBeginTest = async test_code => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.post(`${USER_URL}/student/test/start`, test_code, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const studentAnswer = async student_answer => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.post(`${USER_URL}/student/test/answer`, student_answer, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const studentSubmit = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.post(`${USER_URL}/student/test/submit`, null, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
