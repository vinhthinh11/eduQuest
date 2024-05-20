import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import InputSubject from "../InputSubject.jsx";
import { uploadQuestionByFile } from "../../services/apiQuestion.js";

const subjectOptions = [
  { subject_id: "1", subject_detail: "Toán" },
  { subject_id: "2", subject_detail: "Ngữ Văn" },
  { subject_id: "3", subject_detail: "Lịch sử" },
  { subject_id: "4", subject_detail: "Địa Lý" },
  { subject_id: "5", subject_detail: "Vật Lý" },
  { subject_id: "6", subject_detail: "Công nghệ" },
  { subject_id: "7", subject_detail: "GDCD" },
  { subject_id: "8", subject_detail: "Anh" },
  { subject_id: "9", subject_detail: "Hóa học" },
  { subject_id: "10", subject_detail: "Sinh học" },
];

export default function ModalUploadFileQuestion({ open, setOpen, type }) {
  const handleClose = () => setOpen(false);

  const [data, setData] = useState({ subject_id: 1 });
  const handleInputChange = (e, field) => {
    setData((pre) => ({ ...pre, [field]: e.target.value }));
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      await uploadQuestionByFile("/admin/question/file", data);
      toast.success("Thêm câu hỏi thành công");
      handleClose(); // Đóng modal khi tải lên thành công
    } catch (error) {
      toast.error("Thêm câu hỏi thất bại");
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
          Thêm cây hỏi bằng file
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
          <InputSubject
            label="Môn"
            name="subject_id"
            value={data.subject_id}
            onChange={(e) => handleInputChange(e, "subject_id")}
            options={subjectOptions}
          />
          <input
            type="file"
            name="file"
            id="file_data"
            required
            className="block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-customPurple file:text-white hover:file:bg-customPurpleLight"
            onChange={(e) => {
              setData((pre) => ({ ...pre, file: e.target.files[0] }));
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
