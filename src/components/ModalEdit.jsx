import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  borderRadius: '20px',
  boxShadow: 24,
  focus: { outline: 'none' },
  p: 4,
};

export default function ModalEdit({ open, setOpen, user }) {
  const [userEdit, setUserEdit] = useState(user);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setUserEdit(user);
  }, [user, userEdit]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Editing
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          User: {userEdit?.name}
        </Typography>
      </Box>
    </Modal>
  );
}
