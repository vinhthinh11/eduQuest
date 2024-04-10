import axios from 'axios';
import { QUESTION_URL } from './config.js';
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
