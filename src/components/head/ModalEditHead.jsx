import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputDefault from  '../InputDefault.jsx';
import SelectInput from "../SelectInput";
import { updateUser } from '../../services/apiUser.js';
import toast from 'react-hot-toast';


const subjectOptions = [
  { value: "1", label: "Toán" },
  { value: "2", label: "Ngữ Văn" },
  { value: "3", label: "Lịch sử" },
  { value: "4", label: "Địa Lý" },
  { value: "5", label: "Vật Lý" },
  { value: "6", label: "Công nghệ" },
  { value: "7", label: "GDCD" },
  { value: "8", label: "Anh" },
  { value: "9", label: "Hóa học" },
  { value: "10", label: "Sinh học" },
];

export default function ModalEditHead({ 
  open, 
  setOpen, 
  user,
  setUpdate = () => {},
}) {
  const [userEdit, setUserEdit] = useState(user);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e, field) => {
    setUserEdit(prevUser => ({ ...prevUser, [field]: e.target.value }));
  };

  const handleConfirm = async () => {
    if (userEdit.password.length > 16) {
      delete userEdit.password;
    }
    try {
      await updateUser("/admin/truongbomon/update-tbm", userEdit);
      setOpen(false);
      toast.success('Cập nhật thành công');
      setUpdate(prev => !prev);
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
      <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Chỉnh sửa thông tin {userEdit?.name}
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-14 gap-y-10 md:gap-x-10 whitespace-nowrap">
          <InputDefault
            label="Tên"
            name="name"
            type="text"
            value={userEdit?.name}
            onChange={(e) => handleInputChange(e, 'name')}
          />
          <InputDefault
            label="Mật khẩu"
            name="password"
            type="password"
            show={false}
            onChange={(e) => handleInputChange(e, 'password')}
          />
          <InputDefault
            label="Ngày sinh"
            type="date"
            name="birthday"
            id="birthday"
            className="input-field w-full border-none outline-none ml-5"
            value={userEdit?.birthday}
            onChange={(e) => handleInputChange(e, 'birthday')}
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
