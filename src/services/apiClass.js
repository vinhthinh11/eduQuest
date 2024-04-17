import axios from "axios";
import {
  CLASS_URL,
  CREATE_CLASS_URL,
  SEARCH_CLASS_URL,
  TEACHER_URL,
  UPDATE_CLASS_URL,
} from "./config.js";

export const getClass = async () => {
  try {
    const bearerToken = localStorage.getItem("token");
    const users = await axios.get(CLASS_URL, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return users;
  } catch (err) {
    throw new Error(err);
  }
};

export const getTeachers = async () => {
  try {
    const bearerToken = localStorage.getItem("token");
    const teacher = await axios.get(TEACHER_URL, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
    return teacher;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const createClass = async (newClass) => {
  try {
    const bearerToken = localStorage.getItem("token");

    const response = await axios.post(CREATE_CLASS_URL, newClass, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

export const updateClass = async (updatedClassData) => {
  try {
    const bearerToken = localStorage.getItem('token');
    await axios.put(UPDATE_CLASS_URL, updatedClassData, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};



export const searchClass = async (keySearch) => {
  try {
    const response = await axios.post(SEARCH_CLASS_URL, {
      key_search: keySearch,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
