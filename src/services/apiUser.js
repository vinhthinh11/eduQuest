import axios from 'axios';
import { USER_URL } from './config.js';
export const getUser = async endpoint => {
  try {
    const bearerToken = localStorage.getItem('token');
    const users = await axios.get(`${USER_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return users;
  } catch (err) {
    throw new Error(err);
  }
};
export const deleteUser = async (endpoint, id) => {
  try {
    const bearerToken = localStorage.getItem('token');
    const users = await axios.delete(
      `${USER_URL}${endpoint}`,
      { admin_id: id },
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    return users;
  } catch (err) {
    throw new Error(err);
  }
};
