import { Box, Modal, Typography } from '@mui/material';
import InputDefault from '../InputDefault.jsx';
import { useEffect, useState } from 'react';
import { createUser } from '../../services/apiUser.js';
import toast from 'react-hot-toast';
import { useUserContext } from '../../admin/UserContextProvider.jsx';
import { getSubject } from '../../services/apiSubject.js';
import InputSubject from '../InputSubject.jsx';
import { getClass } from '../../services/apiClass.js';
import InputClass from '../InputClass.jsx';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  display: 'flex',
  flexDirection: 'column',
  bgcolor: '#fff',
  border: '1px solid #000',
  borderRadius: '20px',
  boxShadow: 24,
  height: '80vh',
  overflow: 'auto',
  p: 4,
  '&::-webkit-scrollbar': {
    width: '0.4em',
  },
};
function ModalCreateUser({ open, handleClose, userType }) {
  let dummyUser = { gender_id: 1, username: 'unknown' };
  let tablename;
  switch (userType.userPath) {
    case 'admin':
      tablename = 'admin';
      break;
    case 'teacher':
      tablename = 'Giáo viên';
      dummyUser = { ...dummyUser, subject_id: 1 };
      break;
    case 'subject-head':
      tablename = 'Trưởng bộ môn';
      dummyUser = { ...dummyUser, subject_id: 1 };
      break;
    default:
      tablename = 'Học sinh';
      dummyUser = { ...dummyUser, class_id: 1 };
      break;
  }
  const [user, setUser] = useState(dummyUser);
  const [error, setError] = useState({});
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const { setUpdate } = useUserContext();
  const handleInputChange = (e, field) => {
    setUser(pre => ({ ...pre, [field]: e.target.value }));
  };
  switch (userType.userPath) {
    case 'admin':
      tablename = 'admin';
      break;
    case 'teacher':
      tablename = 'Giáo viên';
      break;
    case 'subject-head':
      tablename = 'Trưởng bộ môn';
      break;
    default:
      tablename = 'Học sinh';
      break;
  }
  async function handleSubmit() {
    try {
      await createUser(
        `${userType.userType}/${userType.userPath}/create`,
        user
      );
      handleClose();
      setUser(dummyUser);
      setUpdate(pre => !pre);
      toast.success(`Thêm mới thành công`);
    } catch (err) {
      console.log(err.response.data.errors);
      toast.error(`Thêm mới thất bại`);
      setError(err.response.data.errors);
    }
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const [subjectData, classData] = await Promise.all([
          getSubject(),
          getClass(),
        ]);
        console.log('subjectsData', subjectData);
        console.log('classData', classData);
        setSubjects(subjectData?.data?.subjects);
        setClasses(classData.data.data);
      } catch (err) {
        toast.error(err.message || 'Có lỗi xảy ra');
      }
    }

    if (userType.userType === 'admin') fetchData();
  }, []);

  return (
    <Modal
      open={open === 4}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          sx={{
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            color: 'grey.800',
            textTransform: 'uppercase',
          }}
        >
          {`THÊM MỚI ${tablename}`}
        </Typography>
        <InputDefault
          label="Tên"
          name="name"
          type="text"
          onChange={e => handleInputChange(e, 'name')}
          value={user?.name}
        />
        {error?.name && (
          <p className="border-2 border-red-500 px-3 py-1 rounded-lg text-red-400">
            {error?.name[0]}
          </p>
        )}
        <InputDefault
          label="Email"
          name="email"
          type="email"
          onChange={e => handleInputChange(e, 'email')}
          value={user?.email}
        />
        {error?.email && (
          <p className="border-2 border-red-500 px-3 py-1 rounded-lg text-red-400">
            {error?.email[0]}
          </p>
        )}
        <InputDefault
          label="Password"
          name="password"
          type="password"
          onChange={e => handleInputChange(e, 'password')}
          value={user?.password}
        />
        {error?.password && (
          <p className="border-2 border-red-500 px-3 py-1 rounded-lg text-red-400">
            {error?.password[0]}
          </p>
        )}
        <InputDefault
          label="Giới tính"
          name="gender_id"
          type="text"
          onChange={e => handleInputChange(e, 'gender_id')}
          value={user?.gender_id}
        />
        {error?.gender_id && (
          <p className="border-2 border-red-500 px-3 py-1 rounded-lg text-red-400">
            {error?.gender_id[0]}
          </p>
        )}
        <InputDefault
          label="Birthday"
          name="birthday"
          type="date"
          onChange={e => handleInputChange(e, 'birthday')}
          value={user?.birthday}
        />
        {userType.userPath === 'student' ? (
          <InputClass
            label="Lớp học"
            name="class_id"
            type="number  "
            onChange={e => handleInputChange(e, 'class_id')}
            value={user?.class_id}
            options={classes}
          />
        ) : ['teacher', 'subject-head'].includes(userType.userPath) ? (
          <InputSubject
            label="Môn"
            name="subject_id"
            onChange={e => handleInputChange(e, 'subject_id')}
            value={user?.subject_id}
            options={subjects}
          />
        ) : null}
        <div className="flex justify-end gap-6 mt-4">
          <button
            onClick={() => {
              handleClose();
              setError({});
            }}
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

export default ModalCreateUser;
