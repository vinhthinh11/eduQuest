import React, { useState, useEffect } from 'react';
import InputDefault from '../InputDefault';
import CheckBox from '../../components/CheckBox';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import { getUser } from '../../services/apiUser';
import LoadingSpinner from '../LoadingSpinner';

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
  p: 4,
};

const SelectedNames = ({ label, selected }) => {
  const selectedLabels = selected.map(item => item.label).join(', ');
  return (
    <div>
      <span>
        {selected.map((item, index) => (
          <span key={index}>
            {item.label}
            {index < selected.length - 1 ? ', ' : '.'}
          </span>
        ))}
      </span>
    </div>
  );
};


const NotificationForm = () => {
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationContent, setNotificationContent] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [openTeacherModal, setOpenTeacherModal] = useState(false);
  const [openClassModal, setOpenClassModal] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  
  useEffect(() => {
    const fetchTeachersAndClasses = async () => {
      try {
        const teachersResponse = await getUser('/admin/teacher/get');
        const classesResponse = await getUser('/admin/class/get');

        if (teachersResponse.data && teachersResponse.data.data) {
          const teacherOptions = teachersResponse.data.data.map((teacher) => ({
            value: teacher.teacher_id,
            label: teacher.username,
          }));
          setTeachers(teacherOptions);
        }

        if (classesResponse.data && classesResponse.data.data) {
          const classOptions = classesResponse.data.data.map((classItem) => ({
            value: classItem.class_id,
            label: classItem.class_name,
          }));
          setClasses(classOptions);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeachersAndClasses();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission
  };

  const handleReset = () => {
    // Reset form fields
    setNotificationTitle('');
    setNotificationContent('');
    setSelectedTeachers([]);
    setSelectedClasses([]);
  };

  return isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className="flex flex-col items-center ">
      <form onSubmit={handleSubmit} className="w-full max-w-lg" id="send_notification">
        <div className="mb-6">
          <InputDefault
            label="Chủ đề"
            name="notification_title"
            onChange={(e) => setNotificationTitle(e.target.value)}
            value={notificationTitle}
          />
        </div>
        <div className="mb-6">
          <InputDefault
            label="Nội dung"
            name="notification_content"
            onChange={(e) => setNotificationContent(e.target.value)}
            value={notificationContent}
          />
        </div>
        <div className="mb-6 flex border-b-2 border-edu">
          <button className="btn mr-2 font-bold" onClick={() => setOpenTeacherModal(true)}>Chọn giáo viên </button>
          <SelectedNames selected={selectedTeachers} />
          <Modal
            open={openTeacherModal}
            onClose={() => setOpenTeacherModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={style}>
              <div className="modal-content">
                <CheckBox
                  label="Giáo viên"
                  value={selectedTeachers}
                  onChange={(value) => {
                    setSelectedTeachers(value);
                  }}
                  options={teachers}
                />
              </div>
            </Box>
          </Modal>
        

        </div>
        <div className="mb-6 flex border-b-2 border-edu">
          <button className="btnbtn mr-2 font-bold" onClick={() => setOpenClassModal(true)}>Chọn lớp </button>
          <Modal
            open={openClassModal}
            onClose={() => setOpenClassModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={style}>
              <div className="modal-content">
                <CheckBox
                  label="Lớp"
                  value={selectedClasses}
                  onChange={(value) => {
                    setSelectedClasses(value);
                  }}
                  options={classes}
                />
              </div>
            </Box>
          </Modal>
        <SelectedNames selected={selectedClasses} />

        </div>
        <div className="flex justify-between pb-9">
          <button name="send_teacher" type="submit" className="min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md" style={{ width: '49%' }}>
            Gửi
          </button>
          <button name="send_teacher" type="button" className="min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md" style={{ width: '49%' }} onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      <div>
      </div>
    </div>
  );
};

export default NotificationForm;
