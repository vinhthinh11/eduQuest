import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SelectInput from "../SelectInput";
import { getTeachers, updateClass } from "../../services/apiClass";
import toast from "react-hot-toast";
import InputDefault from "../InputDefault";
import { useUserContext } from "../../admin/UserContextProvider";

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

const gradeOptions = [
  { value: "10", label: "Khối 10" },
  { value: "11", label: "Khối 11" },
  { value: "12", label: "Khối 12" },
];
export default function ModalEditClass({ open, setOpen, user }) {
  const [userEdit, setUserEdit] = useState(user);
  const [teachers, setTeachers] = useState([]);
  const { setUpdate } = useUserContext();

  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserEdit({ ...userEdit, [name]: value });
  };

  const handleConfirm = async () => {
    try {
      await updateClass(userEdit);
      toast.success("Cập nhật thành công");
      setUpdate(prev => !prev);
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  useEffect(() => {
    setUserEdit(user);
  }, [user]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const teacherData = await getTeachers();

        if (teacherData && teacherData.data && teacherData.data.data) {
          const teacherOptions = teacherData.data.data.map((teacher) => ({
            value: teacher.teacher_id,
            label: teacher.name,
          }));
          setTeachers(teacherOptions);
        } else {
          toast.error("No teacher found");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
    fetchTeachers();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Chỉnh sửa thông tin
        </Typography>

        <InputDefault
          label="Tên lớp"
          name="class_name"
          type="text"
          onChange={(e) => handleInputChange(e, "class_name")}
          value={userEdit?.class_name}
        />
        <SelectInput
          label="Khối"
          name="grade_id"
          value={userEdit?.grade_id}
          onChange={(value) =>
            handleInputChange({ target: { name: "grade_id", value: parseInt(value, 10) } })
          }
          options={gradeOptions}
        />
          

        <SelectInput
          label="Giáo viên"
          name="teacher_id"
          value={userEdit?.teacher_id}
          onChange={(value) =>
            handleInputChange({ target: { name: "teacher_id", value: parseInt(value, 10)} })
          }
          options={teachers}
        />

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
