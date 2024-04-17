import { createContext, useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputDefault from "../InputDefault.jsx";
import { toast } from "react-hot-toast";
import { createUser } from "../../services/apiUser.js";
import SelectInput from "../SelectInput.jsx";
import { useUserContext } from "../../admin/UserContextProvider.jsx";
import { getSubject } from "../../services/apiSubject.js";

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
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, field) => {
    setUser((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    const newHead = { ...user, username: user.name };
    try {
      await createUser("/admin/truongbomon/create", newHead);
      setOpen(false);
      toast.success("Thêm mới thành công");
      setUpdate((prev) => !prev);
    } catch (err) {
      toast.error("Thêm mới thất bại");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const subjectsData = await getSubject();
        console.log("Subjects data:", subjectsData);

        if (subjectsData && subjectsData.data && subjectsData.data.data) {
          const subjectOptions = subjectsData.data.data.map((subject) => ({
            value: subject.subject_id,
            label: subject.subject_detail,
          }));
          setSubjects(subjectOptions);
        } else {
          toast.error("No subjects found");
        }
      } catch (err) {
        console.error("Fetch subjects error:", err);
        toast.error(err.message || "Có lỗi xảy ra");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

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
          value={user.subject_id}
          onChange={(value) =>
            handleInputChange({ target: { value } }, "subject_id")
          }
          options={subjects}
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
