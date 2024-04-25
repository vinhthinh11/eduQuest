import { Box, Modal, Typography } from '@mui/material';
import InputDefault from '../InputDefault.jsx';
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
function ModalCreateClass({
  open,
  handleClose,
  userType,
  classes,
  handleInputChange,
  handleSubmit,
}) {
  return (
    <Modal
      open={open === 3}
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
          {`THÊM MỚI ${userType}`}
        </Typography>
        <InputDefault
          label="Tên"
          name="name"
          type="text"
          onChange={e => handleInputChange(e, 'name')}
          value={classes?.name}
        />
        <InputDefault
          label="Email"
          name="email"
          type="email"
          onChange={e => handleInputChange(e, 'email')}
          value={classes?.email}
        />
        <InputDefault
          label="Password"
          name="password"
          type="password"
          onChange={e => handleInputChange(e, 'password')}
          value={classes?.password}
        />
        <InputDefault
          label="Gender"
          name="gender"
          type="text"
          onChange={e => handleInputChange(e, 'gender')}
          value={classes?.gender}
        />
        <InputDefault
          label="Birthday"
          name="birthday"
          type="date"
          onChange={e => handleInputChange(e, 'birthday')}
          value={classes?.birthday}
        />
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

export default ModalCreateClass;
