import { Button } from '@mui/material';
import ModalPreviewQuestion from '../question/ModalPreviewQuestion.jsx';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { studentBeginPractice } from '../../services/apiPractice.js';

function PracticeComponent({ practices }) {
  const [open, setOpen] = useState(false);
  const [practice, setPractice] = useState('');
  const [status, setStatus] = useState(1);
  const location = useLocation();
  const userType = location.pathname.split('/').at(-2);
  const showModal = userType !== 'student';
  const navigate = useNavigate();

  const handleClose = () => setOpen(false);
  const handleOpen = test => {
    setPractice(test?.practice_code);
    setStatus(test?.status_id);
    setOpen(true);
  };
  const hanldeStudentDoTest = async test => {
    console.log('chuyen trang sang lam bai thi voi ma de', {
      practice_code: test?.practice_code,
    });

    await studentBeginPractice({ practice_code: test?.practice_code });
    toast.success('Chuyển trang sang làm bài thi');
    navigate(`${test?.practice_code}`);
  };
  return (
    <>
      <div className="grid grid-cols-4 px-4 py-2 bg-slate-300">
        <p>Mã đề</p>
        <p>Tên đề</p>
        <p>SL câu hỏi</p>
        <p>Actions</p>
      </div>
      {practices?.map((test, index) => (
        <div
          key={index}
          className="grid grid-cols-4 px-4 py-2 hover:bg-slate-200"
        >
          <p>{test?.practice_code}</p>
          <p>{test?.practice_name}</p>
          <p>{test?.total_questions}</p>
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
                <Button variant="contained" color="error">
                  Xóa
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => hanldeStudentDoTest(test)}
              >
                Ôn tập
              </Button>
            )}
          </div>
        </div>
      ))}
      {showModal && (
        <ModalPreviewQuestion
          open={open}
          handleClose={handleClose}
          testCode={practice}
          status_id={status}
        />
      )}
    </>
  );
}

export default PracticeComponent;
