import React, { useState, useEffect } from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputDefault from '../InputDefault.jsx';
import SelectInput from "../SelectInput";
import { updateUser } from '../../services/apiUser.js';
import { getSubjects } from '../../services/apiQuestion.js'; 
import toast from 'react-hot-toast';
import { useUserContext } from '../../admin/UserContextProvider.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  display: 'flex',
  flexDirection: 'column',
  bgcolor: '#fff',
  border: '1px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

export default function ModalEdit({ open, setOpen, user }) {
  const [userEdit, setUserEdit] = useState(user);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const handleClose = () => setOpen(false);
  const { setUpdate } = useUserContext();

  const handleInputChange = (e, field) => {
    setUserEdit(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleConfirm = async () => {
    if (userEdit.password && userEdit.password.length > 16) {
      delete userEdit.password;
    }
    try {
      await updateUser('/admin/truongbomon/update-tbm', userEdit);
      setOpen(false);
      toast.success('Cập nhật thành công');
      setUpdate(prev => !prev);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Fetch subjects from API
    async function fetchSubjects() {
      try {
        const response = await getSubjects();
        const subjects = response.data.subjects.map(subject => ({
          value: subject.subject_id,
          label: subject.subject_detail,
        }));
        setSubjectOptions(subjects);
      } catch (error) {
        toast.error('Failed to fetch subjects');
      }
    }

    fetchSubjects();
  }, []); 
  // useEffect(() => {
  //   setUserEdit(user);
  // }, [user]);

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
          Chỉnh sửa thông tin {userEdit?.name}
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-y-10 md:gap-x-10 whitespace-nowrap">
        <InputDefault
            label="Tên"
            name="name"
            type="text"
            value={userEdit?.name}
            onChange={e => handleInputChange(e, 'name')}
          />
          <InputDefault
            label="Mật khẩu"
            name="password"
            type="password"
            show={false}
            onChange={handleInputChange}
          />
          <InputDefault
            label="Ngày sinh"
            type="date"
            name="birthday"
            id="birthday"
            className="input-field w-full border-none outline-none ml-5"
            value={userEdit?.birthday}
            onChange={e => handleInputChange(e, 'birthday')}
          />
          <InputDefault
            label="Gender"
            name="gender_id"
            type="text"
            onChange={e => handleInputChange(e, 'gender_id')}
            value={userEdit.gender_id}
          />  
          <SelectInput
            label="Môn"
            name="subject_id"
            value={userEdit?.subject_id}
            onChange={(value) => handleInputChange({ target: { value } }, 'subject_id')}
            options={subjectOptions}
          />
        </div>
        <div className="flex justify-end mt-4 gap-6">
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
