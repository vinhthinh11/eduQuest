import axios from 'axios';
import { NOTIFICATION_STUDENT } from './config';

export const getNotificationStudent= async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const subject = await axios.get(NOTIFICATION_STUDENT, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return subject;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

// export const getNotificationStudent = async (classId) => {
//   try {
//     const bearerToken = localStorage.getItem('token');
//     const url = `http://127.0.0.1:8000/api/student/notification/${classId}`;
//     const subject = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${bearerToken}`,
//       },
//     });
//     return subject;
//   } catch (err) {
//     throw new Error(err.response.data.message);
//   }
// };
