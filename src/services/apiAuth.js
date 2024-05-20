import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const login = async (req, res) => {
  return await axios.get();
};
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};
