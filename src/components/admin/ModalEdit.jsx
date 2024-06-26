import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputDefault from '../InputDefault.jsx';
import toast from 'react-hot-toast';
import { useUserContext } from '../../admin/UserContextProvider.jsx';
import { updateUser } from '../../services/apiUser.js';

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

export default function ModalEdit({ open, setOpen, user, userType = 'admin' }) {
  const [userEdit, setUserEdit] = useState(user);
  const [error, setError] = useState({});
  const handleClose = () => setOpen(false);
  const { setUpdate } = useUserContext();

  const handleInputChange = (e, field) => {
    setUserEdit(pre => ({ ...pre, [field]: e.target.value }));
  };

  const handleConfirm = async () => {
    try {
      await updateUser(
        `/${userType.userType}/${userType.userPath}/update`,
        userEdit
      );
      setOpen(false);
      toast.success('Cập nhật thành công');
      setUpdate(pre => !pre);
    } catch (error) {
      toast.error(error.message);
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
          {`Chỉnh sửa ${userType?.userType}`}
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
          <>
            <InputDefault
              label="Birthday"
              name="birthday"
              type="date"
              onChange={e => {
                setError(prev => ({ ...prev, birthday: '' }));
                const currentYear = new Date().getFullYear();
                const selectedYear = new Date(e.target.value).getFullYear();
                const yearDifference = currentYear - selectedYear;
                if (yearDifference > 10) {
                  handleInputChange(e, 'birthday');
                } else
                  setError({
                    ...error,
                    birthday: 'Tuổi phải lớn hơn 10',
                  });
              }}
              value={userEdit?.birthday}
            />
            {error.birthday && (
              <p className="text-red-500 border-2 border-red-500 px-2 rounded-md">
                {error.birthday}
              </p>
            )}
          </>
          <InputDefault
            label="Gender"
            name="gender_id"
            type="text"
            onChange={e => handleInputChange(e, 'gender_id')}
            value={userEdit.gender_id}
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
