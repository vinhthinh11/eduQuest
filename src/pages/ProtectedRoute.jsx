import { useEffect, useState } from 'react';
import { getUser } from '../services/apiUser.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children, permissions = 0 }) {
  // 1 Admin , 2 Teacher , 3 Student, 4 Subject-Head
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchMe() {
      try {
        setIsLoading(true);
        const { data } = await getUser('/me');
        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMe();
  }, []);
  if (permissions === 0) {
    toast.error('Bạn không có quyền truy cập trang này');
    navigate('/login');
  }
  return isLoading && user?.permissions === permissions ? (
    <LoadingSpinner />
  ) : (
    <>{children}</>
  );
}

export default ProtectedRoute;
