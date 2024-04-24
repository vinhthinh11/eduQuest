import axios from 'axios';
import { SUBJECT_HEAD } from './config.js';

export const getSubject = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const subject = await axios.get(SUBJECT_HEAD, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return subject;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
