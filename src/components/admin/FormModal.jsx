import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import AdminForm from '../admin/AdminForm';

export default function FormModal({ open, setOpen, user }) {
  const [userEdit, setUserEdit] = useState(user);
  const handleClose = () => setOpen(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUserEdit({ ...userEdit, [name]: value });
  };

  const handleConfirm = () => {
    setUserEdit(userEdit);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Thêm mới admin
        </Typography>

        <AdminForm />

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