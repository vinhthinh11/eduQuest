import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputField from '../InputField';
import SelectInput from '../SelectInput';

const gradeOptions = [
  { value: '1', label: 'Khối 10' },
  { value: '2', label: 'Khối 11' },
  { value: '3', label: 'Khối 12' },
];
export default function ModalEditClass({ open, setOpen, user }) {
  const [userEdit, setUserEdit] = useState(user);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserEdit({ ...userEdit, [name]: value });
  };

  const handleConfirm = () => {
    console.log(userEdit);

    // setUserEdit(userEdit);
    setOpen(false);
  };

  useEffect(() => {
    setUserEdit(user);
  }, [user]);



  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Chỉnh sửa thông tin
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-14 gap-y-10 md:gap-x-10 whitespace-nowrap">
          <InputField
            label="Tên lớp"
            name="class_name"
            type="text"
            value={userEdit?.class_name}
            onChange={handleInputChange}
          />
          <SelectInput
            label="Khối"
            name="gender"
            value={userEdit?.grade_id}
            onChange={handleInputChange}
            options={gradeOptions}
          />

          <SelectInput
          label="Giáo viên"
          name="teacher_id"
          value={userEdit?.teacher_id}
          onChange={handleInputChange}
          // options={gradeOptions}
        />
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={handleClose}
            className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Quay lại
          </button>
          <button
            onClick={handleConfirm}
            className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Đồng ý
          </button>
        </div>
      </Box>
    </Modal>
  );
}
