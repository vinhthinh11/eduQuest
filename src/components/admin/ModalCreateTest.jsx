import { Box, Modal, Typography } from '@mui/material';
import InputDefault from '../InputDefault.jsx';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import InputLevel from '../InputLevel.jsx';
import InputGrade from '../InputGrade.jsx';
import { createUser } from '../../services/apiUser.js';
import { useUserContext } from '../../admin/UserContextProvider.jsx';
import { createTest } from '../../services/apiTest.js';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
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
const initialTest = { grade_id: 10, level_id: 1 };
function ModalCreateTest({ open, handleClose, userType }) {
  const [test, setTest] = useState(initialTest);
  const { setUpdate } = useUserContext();
  const handleInputChange = (e, field) => {
    setTest(pre => ({ ...pre, [field]: e.target.value }));
  };
  const handleSubmit = async () => {
    try {
      await createTest(
        `${userType.userType}/${userType.userPath}/create`,
        test
      );
      handleClose();
      toast.success('Thêm mới thành công');
      setTest(initialTest);
      setUpdate(pre => !pre);
    } catch (err) {
      toast.error('Thêm mới thất bại');
    }
  };
  return (
    <Modal
      open={open === 1}
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
          {`THÊM MỚI ${userType.userPath}`}
        </Typography>
        <InputDefault
          label="Tên đề thi"
          name="test_name"
          type="text"
          onChange={e => handleInputChange(e, 'test_name')}
          value={test?.test_name}
        />
        <InputDefault
          label="Mật khẩu đề thi"
          name="password"
          type="text"
          onChange={e => handleInputChange(e, 'password')}
          value={test?.password}
        />
        <InputDefault
          label="Số lượng câu hỏi"
          name="total_questions"
          type="number"
          onChange={e => handleInputChange(e, 'total_questions')}
          value={test?.total_questions}
        />
        <InputLevel
          label="Mức độ"
          name="level_id"
          type="text"
          onChange={e => handleInputChange(e, 'level_id')}
          value={test?.level_id}
        />
        <InputGrade
          label="Khối"
          name="grade_id"
          type="number"
          onChange={e => handleInputChange(e, 'grade_id')}
          value={test?.grade_id}
        />
        <InputDefault
          label="Thời gian làm bài"
          name="time_to_do"
          type="number"
          onChange={e => handleInputChange(e, 'time_to_do')}
          value={test?.time_to_do}
        />
        <InputDefault
          label="Ghi chú bài thi"
          name="note"
          type="text"
          onChange={e => handleInputChange(e, 'note')}
          value={test?.note}
        />
        <div className="flex justify-end gap-6 mt-4">
          <button
            onClick={handleClose}
            className="btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Quay lại
          </button>
          <button
            className="btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Đồng ý
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalCreateTest;
