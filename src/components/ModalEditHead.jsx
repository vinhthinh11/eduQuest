import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import InputField from './InputField';

export default function ModalEdit({ open, setOpen, user }) {
  const [userEdit, setUserEdit] = useState(user);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    // Xử lý logic khi nhấn Đồng ý
    console.log("Đã nhấn Đồng ý");
    setOpen(false);
  };

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
      <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Chỉnh sửa thông tin {userEdit?.name}
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-14 gap-y-10 md:gap-x-10 whitespace-nowrap">
          <InputField 
            label="Tên"
            name="name"
            type="text"
            value={userEdit?.name}
          />
          <InputField
            label="Mật khẩu"
            name="password"
            type="password"
            value={userEdit?.password}
          />
          <div className="mb-4 flex items-center border-b-2">
            <label htmlFor="birthday" className="text-gray-700 font-bold mr-2">Ngày sinh</label>
            <input type="date" name="birthday" id="birthday" className="input-field w-full border-none outline-none ml-5" required defaultValue="1997-01-01" />
          </div>
          <div className="mb-4 flex items-center border-b-2">
            <label htmlFor="gender" className="text-gray-700 font-bold mr-2">Giới tính</label>
            <select name="gender" id="gender" className="input-field">
              <option value="1" selected>Không Xác Định</option>
              <option value="2">Nam</option>
              <option value="3">Nữ</option>
            </select>
            <div className="mb-4 flex items-center"></div>
          <div className="mb-4 flex items-center border-b-2">
            <label htmlFor="gender" className="text-gray-700 font-bold mr-2 ">Môn</label>
            <select name="gender" id="gender" className="input-field">
              <option value="1" selected>Toán</option>
              <option value="2">Văn</option>
              <option value="3">Anh</option>
            </select>
          </div>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button onClick={handleClose} className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
            Quay lại
          </button>
          <button onClick={handleConfirm} className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Đồng ý
          </button>
        </div>
      </Box>
    </Modal>
  );
}
