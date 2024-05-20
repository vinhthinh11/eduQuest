import axios from 'axios';
import { ALL_CHAT_STUDENT, CHAT_STUDENT } from './config';

export const sendNotificationTeacher = async (chatData) => {
    try {
      const bearerToken = localStorage.getItem('token');
      await axios.post(CHAT_STUDENT, chatData, {
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
  

  export const getAllChatStudent = async () => {
    try {
      const bearerToken = localStorage.getItem('token');
      const response = await axios.get(ALL_CHAT_STUDENT, {
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
  

  export const updateMessage = async (messageId, updatedContent) => {
    const bearerToken = localStorage.getItem('token');
    const response = await axios.post(
      '/student/chat/edit',
      {
        id: messageId,
        chat_content: updatedContent,
      },
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );
    return response;
  };

  
  