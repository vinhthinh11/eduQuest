import axios from 'axios';
import { ALL_NOTIFICATION_ADMIN, ALL_NOTIFICATION_STUDENT, SEND_NOTIFICATION_TEACHER_BY_STUDENT } from './config';


export const getAllNotificationStudent = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const subject = await axios.get(ALL_NOTIFICATION_STUDENT, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return subject;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };


  export const getAllNotificationAdmin = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const subject = await axios.get(ALL_NOTIFICATION_ADMIN, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      return subject;
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };


  export const sendNotificationTeacherByStudent = async (notificationData) => {
    try {
      const bearerToken = localStorage.getItem('token');
      await axios.post(SEND_NOTIFICATION_TEACHER_BY_STUDENT, notificationData, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      console.log("Notification sent successfully");
    } catch (err) {
      console.error("Error sending notification:", err.response.data);
      throw new Error(err.response.data.error);
    }
  };
  
  