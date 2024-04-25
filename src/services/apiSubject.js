import axios from 'axios';
import { SUBJECT_URL, DELETE_SUBJECT_URL } from './config.js';

export const getSubject = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const subject = await axios.get(SUBJECT_URL, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return subject;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
