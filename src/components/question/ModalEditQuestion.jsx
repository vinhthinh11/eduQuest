import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { updateUser } from "../../services/apiUser.js";
import InputDefault from "../InputDefault.jsx";
import toast from "react-hot-toast";
import SelectInput from "../SelectInput.jsx";
import { updateQuestion, getSubjects } from "../../services/apiQuestion.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 400,
  display: "flex",
  flexDirection: "column",
  bgcolor: "#fff",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  height: "80vh",
  overflow: "auto",
  p: 4,
  "&::-webkit-scrollbar": {
    width: "0.4em",
  },
};


const levelOptions = [
  { value: "1", label: "Dễ" },
  { value: "2", label: "Trung bình" },
  { value: "3", label: "Khó" },
];

const gradeOptions = [
  { value: "10", label: "Khối 10" },
  { value: "11", label: "Khối 11" },
  { value: "12", label: "Khối 12" },
];

export default function ModalEditQuestion({ open, setOpen, question }) {
  const [userEdit, setUserEdit] = useState(question);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e, field) => {
    setUserEdit((pre) => ({ ...pre, [field]: e.target.value }));
  };

  const handleConfirm = async () => {
    console.log(userEdit);
    try {
      await updateQuestion("/admin/question/update", userEdit);
      setOpen(false);
      toast.success("Cập nhật thành công");
      // setUpdate(pre => !pre);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    setUserEdit(question);
  }, [question]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjects();
        setSubjectOptions(response.data.subjects);
      } catch (error) {
        toast.error("Không thể tải danh sách môn học");
      }
    };
    fetchSubjects();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, width: { width: "60%" } }}>
        <Typography
          id="modal-modal-title"
          sx={{
            textAlign: "center",
            fontSize: "16px",
            fontWeight: "bold",
            color: "grey.800",
            textTransform: "uppercase",
          }}
        >
          Chỉnh sửa thông tin
        </Typography>
        <InputDefault
          label="Câu hỏi"
          name="question_content"
          type="text"
          onChange={(e) => handleInputChange(e, "question_content")}
          value={userEdit?.question_content}
        />
        <InputDefault
          label="A"
          name="answer_a"
          type="text"
          onChange={(e) => handleInputChange(e, "answer_a")}
          value={userEdit?.answer_a}
        />
        <InputDefault
          label="B"
          name="answer_b"
          type="text"
          onChange={(e) => handleInputChange(e, "answer_b")}
          value={userEdit?.answer_b}
        />
        <InputDefault
          label="C"
          name="answer_c"
          type="text"
          onChange={(e) => handleInputChange(e, "answer_c")}
          value={userEdit?.answer_c}
        />
        <InputDefault
          label="D"
          name="answer_d"
          type="text"
          onChange={(e) => handleInputChange(e, "answer_d")}
          value={userEdit?.answer_d}
        />
        <InputDefault
          label="Đúng"
          name="correct_answer"
          type="text"
          onChange={(e) => handleInputChange(e, "correct_answer")}
          value={userEdit?.correct_answer}
        />

        <InputDefault
          label="Chương"
          name="unit"
          type="text"
          onChange={(e) => handleInputChange(e, "unit")}
          value={userEdit?.unit}
        />
        <div className="flex justify-around pt-3">
          <SelectInput
            label="Môn"
            name="subject_id"
            value={userEdit?.subject_id}
            onChange={(value) =>
              handleInputChange(
                { target: { value: parseInt(value, 10) } },
                "subject_id"
              )
            }
            options={subjectOptions.map((subject) => ({
              value: parseInt(subject.subject_id, 10),
              label: subject.subject_detail,
            }))}
          />
          <SelectInput
            label="Cấp độ"
            name="level_id"
            value={userEdit?.level_id}
            onChange={(value) =>
              handleInputChange({ target: { value } }, "level_id")
            }
            options={levelOptions}
          />
          <SelectInput
            label="Khối"
            name="grade_id"
            value={userEdit?.grade_id}
            onChange={(value) =>
              handleInputChange({ target: { value } }, "grade_id")
            }
            options={gradeOptions}
          />
        </div>

        <div className="flex justify-end gap-6 mt-4">
          <button
            onClick={handleClose}
            className="btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Quay lại
          </button>
          <button
            className="btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            onClick={handleConfirm}
          >
            Đồng ý
          </button>
        </div>
      </Box>
    </Modal>
  );
}
