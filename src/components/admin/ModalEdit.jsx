import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { updateUser } from '../../services/apiUser.js';
import InputDefault from '../InputDefault.jsx';
import toast from 'react-hot-toast';

const genderOptions = [
  { value: '1', label: 'Nam' },
  { value: '2', label: 'Nữ' },
  { value: '3', label: 'Không xác định' },
];
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

export default function ModalEdit({
  open,
  setOpen,
  user,
  setUpdate = () => {},
}) {
  const [userEdit, setUserEdit] = useState(user);
  const handleClose = () => setOpen(false);

  const handleInputChange = event => {
    setUserEdit({ ...userEdit, [event.target.name]: event.target.value });
  };

  const handleConfirm = async () => {
    // setUserEdit(userEdit);
    console.log(userEdit);
    try {
      await updateUser('/admin/update-admin', userEdit);
      setOpen(false);
      toast.success('Cập nhật thành công');
      setUpdate(pre => !pre);
    } catch (error) {
      toast.error('Cập nhật thất bại');
    }
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
          thêm mới admin
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-y-10 md:gap-x-10 whitespace-nowrap">
          <InputDefault
            label="Tên"
            name="name"
            type="text"
            value={userEdit?.name}
            onChange={handleInputChange}
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
          />
          <InputDefault
            label="Giới tính"
            name="gender_id"
            value={userEdit?.gender_id}
            onChange={handleInputChange}
            options={genderOptions}
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
