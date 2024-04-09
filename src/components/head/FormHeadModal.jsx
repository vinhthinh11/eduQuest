import { createContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputDefault from "../InputDefault.jsx";
import { toast } from 'react-hot-toast';
import { createUser } from '../../services/apiUser.js';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  display: "flex",
  flexDirection: "column",
  bgcolor: "#fff",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

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

export const FormContext = createContext();
export default function ModalCreate({ open, setOpen }) {
  const [user, setUser] = useState({
    gender: 1,
  });

  const handleClose = () => setOpen(false);

  const handleInputChange = (e, field) => {
    setUser((prevUser) => ({ ...prevUser, [field]: e.target.value }));
  };

  const handleConfirm = async () => {
    const newUser = { ...user, username: user.name };
    try {
      await createUser("/admin/truongbomon/create-tbm", newUser);
      setOpen(false);
      toast.success("Thêm mới thành công");
    } catch (err) {
      toast.error("Thêm mới thất bại");
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
        <Typography
          id="modal-modal-title"
          sx={{
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
            color: "grey.800",
          }}
        >
          THÊM MỚI TRƯỞNG BỘ MÔN
        </Typography>
        <InputDefault
          label="Tên"
          name="name"
          type="text"
          onChange={(e) => handleInputChange(e, "name")}
          value={user.name}
        />
        <InputDefault
          label="Email"
          name="email"
          type="email"
          onChange={(e) => handleInputChange(e, "email")}
          value={user.email}
        />
        <InputDefault
          label="Tài khoản"
          name="username"
          type="text"
          onChange={(e) => handleInputChange(e, "username")}
          value={user.username}
        />
        <InputDefault
          label="Password"
          name="password"
          type="password"
          onChange={(e) => handleInputChange(e, "password")}
          value={user.password}
        />
        <InputDefault
          label="Giới tính"
          name="gender"
          type="text"
          onChange={(e) => handleInputChange(e, "gender")}
          value={user.gender}
        />
        <InputDefault
          label="Ngày sinh"
          name="birthday"
          type="date"
          onChange={(e) => handleInputChange(e, "birthday")}
          value={user.birthday}
        />
        <select
          name="subject"
          className="border rounded-md p-2 mt-2"
          onChange={(e) => handleInputChange(e, "subject")}
          value={user.subject}
        >
          {subjectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={handleClose}
            className="btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Quay lại
          </button>
          <button
            onClick={handleConfirm}
            className="btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
          >
            Đồng ý
          </button>
        </div>
      </Box>
    </Modal>
  );
}
