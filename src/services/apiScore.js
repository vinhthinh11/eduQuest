import axios from 'axios';
import { USER_URL } from './config.js';

export const studentGetScore = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    return await axios.get(`${USER_URL}/student/score/get`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};
