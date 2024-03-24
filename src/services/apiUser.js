import axios from 'axios';
import { USER_URL } from './config.js';
export const getUser = async () => {
  try {
    const users = await axios.get(USER_URL);
    return users;
  } catch (err) {
    throw new Error(err);
  }
};