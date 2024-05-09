import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ClassComponent({ classes }) {
  const navigate = useNavigate();
  const handleClick = classId => {
    console.log(classId);
    navigate(`/teacher/student/${classId}`);
  };
  return (
    <>
      <div className="grid grid-cols-4 px-4 py-2">
        <p>Tên lớp</p>
        <p>Khối lớp</p>
        <p>Giáo viên chủ nhiệm</p>
        <p>Actions</p>
      </div>
      {classes.map((c, i) => (
        <div key={i} className="grid grid-cols-4 px-4 py-2">
          <p>{c.class_name}</p>
          <p>{c.class_name}</p>
          <p>{c?.teacher?.username}</p>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClick(c?.class_id)}
            >
              Chi tiết
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ClassComponent;
