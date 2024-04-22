import axios from 'axios';
import { TEST_DETAIL_URL } from './config.js';

export const getTestDetail = async endpoint => {
    try {
      const bearerToken = localStorage.getItem('token');
      const users = await axios.get(`${TEST_DETAIL_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return users;
    } catch (err) {
      throw new Error(err);
    }
  };

export const fetchTestDetail  = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const users = await axios.get('http://127.0.0.1:8000/api/admin/test/detail/204521', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return users;
    } catch (err) {
      throw new Error(err);
    }
  };
export const fetchTestTime   = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const users = await axios.get('http://127.0.0.1:8000/api/admin/test/get', {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return users;
    } catch (err) {
      throw new Error(err);
    }
  };