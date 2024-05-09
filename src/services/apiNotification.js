import axios from 'axios';
import { ADMIN_LIST_CHAT_STUDENT, ADMIN_LIST_CHAT_TEACHER, NOTIFICATION_STUDENT, SEND_NOTIFICATION_STUDENT, SEND_NOTIFICATION_TEACHER } from './config';

export const getNotificationStudent = async () => {
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


export const getNotificationAdminToStudent = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const response = await axios.get(ADMIN_LIST_CHAT_STUDENT, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    } else if (err.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error("Request failed: " + err.message);
    }
  }
};


export const getNotificationAdminToTeacher = async () => {
  try {
    const bearerToken = localStorage.getItem('token');
    const response = await axios.get(ADMIN_LIST_CHAT_TEACHER, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    } else if (err.request) {
      throw new Error("No response received from the server");
    } else {
      throw new Error("Request failed: " + err.message);
    }
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




export const sendNotificationClass = async (notificationData) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(SEND_NOTIFICATION_STUDENT, notificationData, {
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


export const sendNotificationTeacher = async (notificationData) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.post(SEND_NOTIFICATION_TEACHER, notificationData, {
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

