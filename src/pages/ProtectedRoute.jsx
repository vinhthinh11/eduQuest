import { useEffect, useState } from 'react';
import { getUser } from '../services/apiUser.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children, permissions = 0 }) {
  // 1 Admin , 2 Teacher , 3 Student, 4 Subject-Head
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchMe() {
      try {
        setIsLoading(true);
        const { data } = await getUser('/me');
        setUser(data);
        if (data.permission === permissions) {
          setShow(true);
          if (data.permission === 3) {
            // check is doing test or practice
            const test_code = data.doing_exam;
            const practice_code = data.doing_practice;
            if (test_code) {
              setTimeout(() => {
                toast.success(
                  'Bạn đang làm bài thi và sẽ được chuyển hướng tới trang làm bài thi'
                );
                navigate(`test/${test_code}`);
              }, 700);
            }
            if (practice_code) {
              setTimeout(() => {
                toast.success(
                  'Bạn đang làm bài thi và sẽ được chuyển hướng tới trang làm bài thi'
                );
                navigate(`practice/${practice_code}`);
              }, 700);
            }
          }
        } else {
          navigate('/login');
          toast.error('Bạn không có quyền truy cập');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMe();
  }, []);
  return show && !isLoading ? children : <LoadingSpinner />;
}

export default ProtectedRoute;
