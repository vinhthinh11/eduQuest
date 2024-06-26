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
      <div className="grid grid-cols-5 px-4 py-2 bg-slate-300">
        <p className="text-center">Mã đề</p>
        <p className="text-center">Môn</p>
        <p className="text-center">Tên đề</p>
        <p className="text-center">SL câu hỏi</p>
        <p className="text-center">Actions</p>
      </div>
      {practices?.length === 0 && (
        <div className="text-center py-4">
          <p className="font-medium text-lg text-pink-500">
            Hiện giờ chưa có bài ôn tập nào cả
          </p>
          <p>😕😕😕</p>
        </div>
      )}
      {practices?.map((test, index) => (
        <div
          key={index}
          className="grid grid-cols-5 px-4 py-2 hover:bg-slate-200"
        >
          <p className="text-center">{test?.practice_code}</p>
          <p className="text-center">{test?.subject?.subject_detail}</p>
          <p className="text-center">
            {test?.practice_name ?? `Ôn tập ${test?.subject?.subject_detail}`}
          </p>
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
