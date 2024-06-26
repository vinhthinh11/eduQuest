import axios from 'axios';
import {
  CREATE_QUESTION_URL,
  QUESTION_URL,
  STATUS_URL,
  SUBJECTS_URL,
  USER_URL,
} from './config.js';

export const createQuestion = async question => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(CREATE_QUESTION_URL, question, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    throw err;
  }
};
export const userCreateQuestion = async (endpoint, question) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(`${USER_URL}/${endpoint}`, question, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    throw err;
  }
};
export const uploadQuestionByFile = async (endpoint, data) => {
  try {
    const bearerToken = localStorage.getItem('token');
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    await axios.post(`${USER_URL}${endpoint}`, formData, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (err) {
    throw err;
  }
};
export const getQuestion = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const questions = await axios.get(QUESTION_URL, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return questions;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getSubjects = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const subjects = await axios.get(SUBJECTS_URL, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return subjects;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getStatus = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const subjects = await axios.get(STATUS_URL, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return subjects;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
export const updateQuestion = async (endpoint, user) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.put(`${USER_URL}${endpoint}`, user, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error(err.response.data);
  }
};
export const findQuestion = async query => {
  try {
    return await axios.post(`${USER_URL}/question/search`, {
      key_search: query,
    });
  } catch (err) {
    throw err;
  }
};
export const deleteQuesiton = async id => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.delete(`${USER_URL}/admin/question/delete`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
      data: {
        ...id,
      },
    });
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
