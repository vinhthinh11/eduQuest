import axios from 'axios';
import { DELETE_HEAD_JUBJECT_URL } from './config';

export const deleteHeadSubject = async (headSubjectId) => {
  try {
    const bearerToken = localStorage.getItem('token');
    const response = await axios.delete(`${DELETE_HEAD_JUBJECT_URL}/${headSubjectId}`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
