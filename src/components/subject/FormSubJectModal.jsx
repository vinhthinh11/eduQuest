import { createContext, useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputDefault from "../InputDefault.jsx";
import { toast } from "react-hot-toast";
import { createUser } from "../../services/apiUser.js";
import SelectInput from "../SelectInput.jsx";
import { useUserContext } from "../../admin/UserContextProvider.jsx";

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

export const FormContext = createContext();
export default function ModalCreate({ open, setOpen }) {
  const [user, setUser] = useState({ gender: 1 });
  const handleClose = () => setOpen(false);
  const { setUpdate } = useUserContext();
  const [subjects, setSubjects] = useState({});

  const handleInputChange = (e, field) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    const newHead = { ...user, username: user.name };
    try {
      await createUser("/admin/mon/create", newHead);
      setOpen(false);
      toast.success("Thêm mới thành công");
      setUpdate((prev) => !prev);
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
          THÊM MỚI MÔN
        </Typography>
        <InputDefault
          label="Tên"
          name="subject_detail"
          type="text"
          onChange={(e) => handleInputChange(e, "subject_detail")}
          value={user.subject_detail}
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
