import { Box, Modal, Typography } from '@mui/material';
import InputDefault from '../InputDefault.jsx';
import { createContext, useEffect, useState } from 'react';
import {
  createQuestion,
  userCreateQuestion,
} from '../../services/apiQuestion.js';
import { useUserContext } from '../../admin/UserContextProvider.jsx';
import { getSubject } from '../../services/apiSubject.js';
import toast from 'react-hot-toast';
import SelectInput from '../SelectInput.jsx';
import SubjectInput from '../SubjectInput.jsx';
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
const levelOptions = [
  { value: '0', label: 'Hãy chọn cấp độ' },
  { value: '1', label: 'Dễ' },
  { value: '2', label: 'Trung bình' },
  { value: '3', label: 'Khó' },
];
const correctOptions = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
  { value: 'c', label: 'C' },
  { value: 'd', label: 'D' },
];

const gradeOptions = [
  { value: '9', label: 'Hãy chọn khối' },
  { value: '10', label: 'Khối 10' },
  { value: '11', label: 'Khối 11' },
  { value: '12', label: 'Khối 12' },
];

function ModalCreateQuestion({ open, handleClose, setOpen }) {
  const [question, setQuestion] = useState({
    subject_id: 1,
    level_id: 1,
    grade_id: 10,
    status_id: 3,
    correct_answer: 'a',
    suggest: 'Không có gợi ý',
  });
  const [error, setError] = useState({});
  const [subjects, setSubjects] = useState([]);
  const { setUpdate } = useUserContext();
  const handleInputChange = (e, field) => {
    setQuestion(pre => ({ ...pre, [field]: e.target.value }));
  };
  const { userLink } = useUserContext();
  console.log(userLink);
  const handleSubmit = async () => {
    try {
      await userCreateQuestion(
        `${userLink.userType}/question/create`,
        question
      );
      setOpen(false);
      toast.success('Thêm mới thành công');
      setUpdate(pre => !pre);
    } catch (err) {
      setError(err.response.data.errors);
      toast.error('Thêm mới thất bại');
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getSubject();
        setSubjects(data.subjects);
        console.log('subjectsData', data);
      } catch (err) {
        toast.error(err.message || 'Có lỗi xảy ra');
      }
    }

    fetchData();
  }, []);

  return (
    <Modal
      open={open === 2}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: { width: '50%' } }}>
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
          THÊM MỚI CÂU HỎI
        </Typography>
        <InputDefault
          label="Câu hỏi"
          name="question_content"
          type="text"
          onChange={e => handleInputChange(e, 'question_content')}
          value={question.question_content}
        />
        {error?.question_content && (
          <p className="text-red-500">{error?.question_content[0]}</p>
        )}
        <InputDefault
          label="A"
          name="answer_a"
          type="text"
          onChange={e => handleInputChange(e, 'answer_a')}
          value={question.answer_a}
        />
        {error?.answer_a && (
          <p className="text-red-500">{error?.answer_a[0]}</p>
        )}
        <InputDefault
          label="B"
          name="answer_b"
          type="text"
          onChange={e => handleInputChange(e, 'answer_b')}
          value={question.answer_b}
        />
        {error?.answer_b && (
          <p className="text-red-500">{error?.answer_b[0]}</p>
        )}
        <InputDefault
          label="C"
          name="answer_c"
          type="text"
          onChange={e => handleInputChange(e, 'answer_c')}
          value={question.answer_c}
        />
        {error?.answer_c && (
          <p className="text-red-500">{error?.answer_c[0]}</p>
        )}
        <InputDefault
          label="D"
          name="answer_d"
          type="text"
          onChange={e => handleInputChange(e, 'answer_d')}
          value={question.answer_d}
        />
        {error?.answer_d && (
          <p className="text-red-400">{error?.answer_d[0]}</p>
        )}
        <SelectInput
          label="Đáp án đúng"
          name="correct_answer"
          type="text"
          onChange={value =>
            handleInputChange({ target: { value } }, 'correct_answer')
          }
          value={question.correct_answer}
          options={correctOptions}
        />

        <InputDefault
          label="Gợi ý"
          name="suggest"
          type="text"
          onChange={e => handleInputChange(e, 'suggest')}
          value={question.suggest}
        />
        {error?.suggest && <p className="text-red-500">{error?.suggest[0]}</p>}
        <InputDefault
          label="Chương"
          name="unit"
          type="text"
          onChange={e => handleInputChange(e, 'unit')}
          value={question.unit}
        />
        <div className="flex justify-around pt-3 gap-3">
          <SubjectInput
            label="Môn"
            name="subject_id"
            value={question.subject_id}
            onChange={e => handleInputChange(e, 'subject_id')}
            options={subjects}
          />
          <SelectInput
            label="Cấp độ"
            name="level_id"
            value={question?.level_id}
            onChange={value =>
              handleInputChange({ target: { value } }, 'level_id')
            }
            options={levelOptions}
          />
          <SelectInput
            label="Khối"
            name="grade_id"
            value={question?.grade_id}
            onChange={value =>
              handleInputChange({ target: { value } }, 'grade_id')
            }
            options={gradeOptions}
          />
        </div>

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

export default ModalCreateQuestion;
