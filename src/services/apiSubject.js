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


  
  export const deleteSubjectById = async (subjectId) => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get(`${DELETE_SUBJECT_URL}/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  