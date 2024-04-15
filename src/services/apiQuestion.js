import axios from 'axios';
import { QUESTION_URL, STATUS_URL, SUBJECTS_URL } from './config.js'; 
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