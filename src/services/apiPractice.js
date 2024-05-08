import axios from 'axios';
import { USER_URL } from './config.js';

export const getPracticeDetail = async endpoint => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.get(`${USER_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const updatePractice = async (endpoint, data) => {
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
export const studentBeginPractice = async test_code => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.post(`${USER_URL}/student/practice/start`, test_code, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const studentAnswerPractice = async student_answer => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.post(
      `${USER_URL}/student/practice/answer`,
      student_answer,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const studentSubmitPractice = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.post(`${USER_URL}/student/practice/submit`, null, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
export const getPracticeResult = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.get(`${USER_URL}/student/practice/result`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
