import axios from 'axios';
import { QUESTION_URL } from './config.js';
export const getQuestion = async () => {
  try {
    const users = await axios.get(QUESTION_URL);
    return users;
  } catch (err) {
    throw new Error(err);
  }
};
