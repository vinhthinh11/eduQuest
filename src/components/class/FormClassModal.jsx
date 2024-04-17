import { createContext, useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputDefault from '../InputDefault.jsx';
import { createClass, getTeachers } from '../../services/apiClass.js';
import SelectInput from "../SelectInput.jsx";
import toast from "react-hot-toast";
import { useUserContext } from '../../admin/UserContextProvider.jsx';


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
  p: 4,
};

const gradeOptions = [
  { value: '9', label: 'Hãy chọn khối' },
  { value: '10', label: 'Khối 10' },
  { value: '11', label: 'Khối 11' },
  { value: '12', label: 'Khối 12' },
];

export const FormContext = createContext();

export default function ModalCreate({ open, setOpen }) {
  const [classes, setClasses] = useState({});
  const [teachers, setTeachers] = useState([]);
  const { setUpdate } = useUserContext();

  const handleClose = () => setOpen(false);

  const handleInputChange = (e, field) => {
    setClasses(prevClasses => ({ ...prevClasses, [field]: e.target.value }));
  };

  const handleConfirm = async () => {
    const newClass = { ...classes, classname: classes?.class_name  };
    try {
      await createClass(newClass);
      setOpen(false);
      toast.success('Thêm mới thành công');
      console.log('««««« newClass »»»»»', newClass);
      setUpdate(pre => !pre);
    } catch (err) {
      toast.error('Thêm mới thất bại');
    }
  };

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const teacherData = await getTeachers();

        if (teacherData && teacherData.data && teacherData.data.data) {
          const teacherOptions = teacherData.data.data.map((teacher) => ({
            value: teacher.teacher_id,
            label: teacher.name,
          }));
          setTeachers(teacherOptions);
        } else {
          toast.error("No teacher found");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchTeachers();
  }, []);

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
          }}
        >
          THÊM MỚI LỚP
        </Typography>
        <InputDefault
          label="Tên lớp"
          name="class_name"
          type="text"
          onChange={e => handleInputChange(e, 'class_name')}
          value={classes?.class_name}
        />
        <SelectInput
            label="Khối"
            name="grade_id"
            value={classes?.grade_id}
            onChange={value =>
              handleInputChange({ target: { value } }, 'grade_id')
            }
            options={gradeOptions}
          />
        <SelectInput
          label="Giáo viên"
          name="teacher_id"
          value={classes?.teacher_id}
          onChange={(value) =>
            handleInputChange({ target: { value } }, "teacher_id")
          }
          options={teachers}
        />

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleClose}
            className="btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Quay lại
          </button>
          <button
            onClick={handleConfirm}
            className="btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Đồng ý
          </button>
        </div>
      </Box>
    </Modal>
  );
}
