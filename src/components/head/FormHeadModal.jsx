import { createContext, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputDefault from "../InputDefault.jsx";
import { toast } from "react-hot-toast";
import { createUser } from "../../services/apiUser.js";
import SelectInput from "../SelectInput.jsx";
import { useUserContext } from "../../admin/UserContextProvider.jsx";

// import { useForm } from 'react-hook-form';
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
  const [user, setUser] = useState({ gender: 1 });
  const handleClose = () => setOpen(false);
  const { setUpdate } = useUserContext();

  // const [subjectOptions, setSubjectOptions] = useState([]);
  // const fetchSubjectOptions = async () => {
  //   try {
  //     const response = await axios.get("/admin/mon/"); // Thay đổi URL này cho phù hợp với API của bạn
  //     const subjects = response.data.data;
  //     const options = subjects.map((subject) => ({
  //       value: subject.id.toString(),
  //       label: subject.subject_detail,
  //     }));
  //     setSubjectOptions(options);
  //   } catch (error) {
  //     console.error("Error fetching subject options:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchSubjectOptions();
  // }, [user]);

  const handleInputChange = (e, field) => {
    setUser((pre) => ({ ...pre, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    const newUser = { ...user, username: user.name };
    try {
      await createUser("/admin/truongbomon/create-tbm", newUser);
      setOpen(false);
      toast.success("Thêm mới thành công");
      setUpdate(pre => !pre);
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
          label="Password"
          name="password"
          type="password"
          onChange={(e) => handleInputChange(e, "password")}
          value={user.password}
        />
        <InputDefault
          label="Gender"
          name="gender"
          type="text"
          onChange={(e) => handleInputChange(e, "gender")}
          value={user.gender}
        />
        <InputDefault
          label="Birthday"
          name="birthday"
          type="date"
          onChange={(e) => handleInputChange(e, "birthday")}
          value={user.birthday}
        />
        <SelectInput
            label="Môn"
            name="subject_id"
            value={user?.subject_id}
            onChange={(value) => handleInputChange({ target: { value } }, 'subject_id')}
            options={subjectOptions}
          />
        {/* <SelectInput
          label="Môn"
          name="subject_id"
          value={user?.subject_id}
          onChange={(value) =>
            handleInputChange({ target: { value } }, "subject_id")
          }
          options={subjectOptions}
        /> */}

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
