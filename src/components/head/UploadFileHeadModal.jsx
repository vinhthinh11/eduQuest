import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { uploadUserByFile } from "../../services/apiUser.js";
import toast from "react-hot-toast";
export default function ModalEdit({ open, setOpen, user }) {
  const handleClose = () => setOpen(false);
  const [file, setFile] = useState(null);

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await uploadUserByFile('/admin/subject-head/file', file);
      toast.success("Thêm trưởng bộ môn thành công");
      handleClose();
    } catch (error) {
      toast.error("Thêm trưởng bộ môn thất bại");
    }
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
          Thêm trưởng bộ môn bằng file
        </Typography>

        <span className="block mb-4">Lưu ý:</span>
        <ul className="list-disc pl-6 mb-4">
          <li>Không sửa file mẫu tránh gây lỗi khi nhập dữ liệu.</li>
          <li>
            Tài khoản và email của mỗi tài khoản là duy nhất, không thể trùng
            nhau.
          </li>
          <li>Ngày sinh phải đúng định dạng Y-m-d, ví dụ: 2008-10-29.</li>
        </ul>
        <span id="error" className="block text-red-500 mb-4"></span>
        <form
          encType="multipart/form-data"
          className="items-center"
          onSubmit={handleConfirm}
        >
          <input
            type="file"
            name="file_data"
            id="file_data"
            required
            className="block w-full text-sm text-slate-700
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-customPurple file:text-white
          hover:file:bg-customPurpleLight"
            onChange={(e) => {
              setFile(e.target?.files?.[0]);
            }}
          />
          <div className="flex justify-between mt-8">
            <button
              onClick={handleClose}
              className="btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Quay lại
            </button>
            <button
              type="submit"
              className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Đồng ý
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
