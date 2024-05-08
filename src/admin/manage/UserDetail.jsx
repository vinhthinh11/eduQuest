import React, { useState } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import ModalCreate from '../../components/admin/ModalCreate';
import ModalUploadFile from '../../components/admin/ModalUploadFile';
import { useLocation } from 'react-router-dom';
import { UserContextProvider } from '../UserContextProvider.jsx';

function UserDetail() {
  const [showAdminForm, setShowAdminForm] = useState(0);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const location = useLocation();
  // get current user type
  const userType = location.pathname.split('/').at(-2); // student, teacher, admin, head
  // get current user path
  const userPath = location.pathname.split('/').at(-1);
  const userLink = { userPath, userType };
  let tablename = 'người dùng';
  const handleShowDynamicForm = () => {
    switch (userPath) {
      case 'test':
        setShowAdminForm(1);
        tablename = 'bài thi';
        break;
      case 'practice':
        setShowAdminForm(5);
        tablename = 'bài kiểm tra';
        break;
      case 'question':
        setShowAdminForm(2);
        tablename = 'câu hỏi';
        break;
      case 'class':
        setShowAdminForm(3);
        tablename = 'lớp học';
        break;
      default:
        setShowAdminForm(4);
        tablename = 'người dùng';
        break;
    }
  };

  return (
    <UserContextProvider>
      <div className=" flex flex-col">
        <div className="w-full">
          <AdminTable userType={userLink} />
        </div>
        <div className="title-content">
          <div className="text-center grid grid-cols-2 gap-4 w-full border-t-2 border-edu">
            <div className={showAdminForm ? 'border-b-2 border-edu' : ''}>
              <button
                className="text-sm font-medium my-4 bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
                onClick={handleShowDynamicForm}
              >
                {`Thêm mới ${tablename}`}
              </button>
            </div>
            <div className={showFileUpload ? 'border-b-2 border-edu' : ''}>
              <button
                className="text-sm font-medium my-4 bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
                onClick={() => {
                  setShowFileUpload(true);
                  setShowAdminForm(false);
                }}
              >
                Thêm bằng file
              </button>
            </div>
          </div>
        </div>
        <ModalCreate
          open={showAdminForm}
          userType={userLink}
          setOpen={setShowAdminForm}
        />
        <ModalUploadFile open={showFileUpload} setOpen={setShowFileUpload} />
      </div>
    </UserContextProvider>
  );
}

export default UserDetail;
