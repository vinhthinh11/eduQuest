import axios from 'axios';
import { SUBJECTS_URL } from './config.js';

export const getSubject = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const subject = await axios.get(SUBJECTS_URL, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return subject;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
