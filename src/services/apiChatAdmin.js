import axios from 'axios';
import { ADMIN_LIST_CHAT_STUDENT, ADMIN_LIST_CHAT_TEACHER } from './config';

export const getAdminChatStudent = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const subject = await axios.get(ADMIN_LIST_CHAT_STUDENT, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return subject;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const getAdminChatTeacher = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const subject = await axios.get(ADMIN_LIST_CHAT_TEACHER, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return subject;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };
  
