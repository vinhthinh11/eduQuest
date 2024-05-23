import { Button } from '@mui/material';
import ModalPreviewQuestion from '../question/ModalPreviewQuestion.jsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { studentBeginTest } from '../../services/apiTest.js';
const statuses = {
  1: 'Đóng',
  2: 'Mở',
  3: 'Chờ duyệt',
  4: 'Đã duyệt',
  5: 'Không duyệt',
};

function TestComponent({ tests }) {
  const [open, setOpen] = useState(false);
  const [testCode, setTestCode] = useState('');
  const [status, setStatus] = useState(1);
  const location = useLocation();
  const userType = location.pathname.split('/').at(-2);
  const showModal = userType !== 'student';
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);
  const handleOpen = test => {
    setTestCode(test?.test_code);
    setStatus(test?.status_id);
    setOpen(true);
  };
  const hanldeStudentDoTest = async test => {
    console.log('chuyen trang sang lam bai thi voi ma de', {
      test_code: test?.test_code,
    });

    await studentBeginTest({ test_code: test?.test_code });
    toast.success('Chuyển trang sang làm bài thi');
    navigate(`${test?.test_code}`);
  };
  if (tests.length === 0)
    return (
      <div className="text-center py-4">
        <p className="font-medium text-lg text-pink-500">
          Hiện giờ chưa có bài thi
        </p>
        <p>😕😕😕</p>
      </div>
    );
  return (
    <>
      <div className="grid grid-cols-5 px-4 py-2 bg-slate-300">
        <p className="text-center">Mã đề</p>
        <p className="text-center">Tên đề</p>
        <p className="text-center">Trạng thái</p>
        <p className="text-center">SL câu hỏi</p>
        <p className="text-center">Actions</p>
      </div>
      {tests?.map((test, index) => (
        <div
          key={index}
          className="grid grid-cols-5 px-4 py-2 hover:bg-slate-200"
        >
          <p className="text-center">{test?.test_code}</p>
          <p className="text-center">{test?.test_name}</p>
          <p className="text-center">{statuses[test?.status_id]}</p>
          <p className="text-center">{test?.total_questions}</p>
          <div className="flex flex-col gap-2">
            {userType !== 'student' ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleOpen(test)}
                >
                  Chi tiết
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="success"
                disabled={test?.status_id !== 2}
                onClick={() => hanldeStudentDoTest(test)}
              >
                Làm bài thi
              </Button>
            )}
          </div>
        </div>
      ))}
      {showModal && (
        <ModalPreviewQuestion
          open={open}
          handleClose={handleClose}
          testCode={testCode}
          status_id={status}
        />
      )}
    </>
  );
}

export default TestComponent;
