import { createContext, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputDefault from '../InputDefault.jsx';
import { toast } from 'react-hot-toast';
import { useUserContext } from '../../admin/UserContextProvider.jsx';
import SelectInput from '../SelectInput.jsx';
import { getSubject } from "../../services/apiSubject.js";
import { createQuestion } from '../../services/apiQuestion.js';

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

const gradeOptions = [
  { value: '9', label: 'Hãy chọn khối' },
  { value: '10', label: 'Khối 10' },
  { value: '11', label: 'Khối 11' },
  { value: '12', label: 'Khối 12' },
];
export const FormContext = createContext();
export default function ModalCreate({ open, setOpen }) {
  const [user, setUser] = useState({ });
  const handleClose = () => setOpen(false);
  const [subjects, setSubjects] = useState({});
  const { setUpdate } = useUserContext();

  const handleInputChange = (e, field) => {
    setUser(pre => ({ ...pre, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    const newQuestion = { ...user,subject_id:user.subject_id, status_id: 3, username: user.question_content  };
    try {
      await createQuestion(newQuestion);
      setOpen(false);
      toast.success('Thêm mới thành công');
      console.log('««««« newQuestion »»»»»', newQuestion);
      setUpdate(pre => !pre);
    } catch (err) {
      toast.error('Thêm mới thất bại');
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const subjectsData = await getSubject();

        if (subjectsData && subjectsData.data && subjectsData.data.data) {
          const subjectOptions = subjectsData.data.data.map((subject) => ({
            value: subject.subject_id,
            label: subject.subject_detail,
          }));
          setSubjects(subjectOptions);
        } else {
          toast.error("No subjects found");
        }
      } catch (err) {
        console.error("Fetch subjects error:", err);
        toast.error(err.message || "Có lỗi xảy ra");
      } finally {
        
      }
    }

    fetchData();
  }, []);

  return (
    <Modal
      open={open}
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
          value={user.question_content}
        />
        <InputDefault
          label="A"
          name="answer_a"
          type="text"
          onChange={e => handleInputChange(e, 'answer_a')}
          value={user.answer_a}
        />
        <InputDefault
          label="B"
          name="answer_b"
          type="text"
          onChange={e => handleInputChange(e, 'answer_b')}
          value={user.answer_b}
        />
        <InputDefault
          label="C"
          name="answer_c"
          type="text"
          onChange={e => handleInputChange(e, 'answer_c')}
          value={user.answer_c}
        />
        <InputDefault
          label="D"
          name="answer_d"
          type="text"
          onChange={e => handleInputChange(e, 'answer_d')}
          value={user.answer_d}
        />
        <InputDefault
          label="Đúng"
          name="correct_answer"
          type="text"
          onChange={e => handleInputChange(e, 'correct_answer')}
          value={user.correct_answer}
        />

        <InputDefault
          label="Gợi ý"
          name="suggest"
          type="text"
          onChange={e => handleInputChange(e, 'suggest')}
          value={user.suggest}
        />
        <InputDefault
          label="Chương"
          name="unit"
          type="text"
          onChange={e => handleInputChange(e, 'unit')}
          value={user.unit}
        />
        <div className="flex justify-around pt-3">
        <SelectInput
          label="Môn"
          name="subject_id"
          value={user.subject_id}
          onChange={(value) =>
            handleInputChange({ target: { value } }, "subject_id")
          }
          options={subjects}
        />
          <SelectInput
            label="Cấp độ"
            name="level_id"
            value={user?.level_id}
            onChange={value =>
              handleInputChange({ target: { value } }, 'level_id')
            }
            options={levelOptions}
          />
          <SelectInput
            label="Khối"
            name="grade_id"
            value={user?.grade_id}
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
