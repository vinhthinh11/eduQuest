import { Box, Modal, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getTestDetail, updateTest } from '../../services/apiTest.js';
import { useUserContext } from '../../admin/UserContextProvider.jsx';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: '#fff',
  border: '1px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  height: '80vh',
  overflow: 'auto',
  p: 4,
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
};

function ModalPreviewQuestion({ testCode, open, handleClose, status_id }) {
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState(status_id);
  const { userLink, setUpdate } = useUserContext();
  const handlePreview = async () => {
    try {
      const data = await updateTest(
        `${userLink.userType}/${userLink.userPath}/update/${testCode}`,
        { status_id: status }
      );
      setUpdate(pre => !pre);
      handleClose();
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error('Duyệt câu đề thất bại');
    }
  };
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const { data } = await getTestDetail(
          `${userLink.userType}/${userLink.userPath}/get/${testCode}`
        );
        setQuestions(data?.data?.questions);
      } catch (error) {
        console.log(error);
      }
    };
    if (testCode) {
      fetchQuestion();
    }
  }, [testCode, userLink]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          sx={{
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'grey.800',
            textTransform: 'uppercase',
          }}
        >
          duyệt đề
        </Typography>

        <div className="flex justify-end gap-6 mt-4">
          <select
            name="status_id"
            id="status_id"
            className="bg-orange-300 rounded-md focus:outline-none px-2 py-1 
            focus:bg-orange-400 text-slate-800 font-normal"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value={2}>Mở đề</option>
            <option value={1}>Đóng đề</option>
            <option value={4}>Duyệt đề</option>
            <option value={5}>Không duyệt</option>
          </select>
          <button
            className="btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            onClick={handleClose}
          >
            Quay lại
          </button>
          <button
            className="btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={handlePreview}
          >
            Đồng ý
          </button>
        </div>
        {questions?.map((question, index) => (
          <div key={index} className="flex gap-2 divide-y">
            <span>{index + 1}</span>
            <p>{question?.question_content}</p>
          </div>
        ))}
      </Box>
    </Modal>
  );
}

export default ModalPreviewQuestion;
