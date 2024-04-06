import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { deleteUser } from "../services/apiUser.js";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const ModalDelete = ({ open, setOpen, user }) => {
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    try {
      console.log("thực hien delete admin");
      await deleteUser("/admin/delete-admin", user.admin_id);
      handleClose();
      toast.success("Xoá tài khoản thành công");
    } catch (err) {
      toast.error("Xoá tài khoản không thành công");
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
          Xác nhận xoá tài khoản {user.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <button
            onClick={handleClose}
            className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Quay lại
          </button>
          <button
            onClick={handleDelete}
            className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Xóa
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
