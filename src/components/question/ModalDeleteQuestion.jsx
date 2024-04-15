import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { deleteUser } from '../../services/apiUser.js';
import toast from 'react-hot-toast';
// import { useUserContext } from '../../admin/UserContextProvider.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  border: '1px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  p: 3,
};


const ModalDeleteQuestion = ({ open, setOpen, question, userType = 'question' }) => {
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      const data = await deleteUser('/admin/question/delete', question[`${userType}_id`]);
      console.log('Delete request successful', data);
      handleClose();
      toast.success(data.data.message);
    } catch (err) {
      console.error('Error deleting item', err);
      toast.error(err.message || 'Error deleting item');
    }
  };
  
  

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Cảnh báo
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Xác nhận xoá tài câu hỏi
        </Typography>
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, gap: 1 }}
        >
          <button
            onClick={handleClose}
            className="min-w-24 bg-slate-100 hover:bg-slate-500 text-slate-600 hover:text-slate-100 font-bold py-2 px-4 rounded border-2 border-slate-500 transition duration-300 ease-in-out"
          >
            Quay lại
          </button>
          <button
            onClick={handleDelete}
            className="min-w-24 bg-slate-100 hover:bg-red-500 text-red-500 hover:text-slate-100 font-bold py-2 px-4 rounded border-2 border-red-500 transition duration-300 ease-in-out"
          >
            Xóa
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDeleteQuestion;
