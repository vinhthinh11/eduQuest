import React, { createContext, useState } from 'react';
import AdminTable from '../../components/admin/AdminTable';
import ModalCreate from '../../components/admin/ModalCreate';
import ModalUploadFile from '../../components/admin/ModalUploadFile';
import { useLocation } from 'react-router-dom';
import { UserContextProvider } from '../UserContextProvider.jsx';

const linkUser = {
  admin: 'admin',
  teacher: 'admin/teacher',
  student: 'admin/student',
  head: 'admin/head',
  class: 'admin/class',
  question: 'admin/question',
  exam: 'admin/exam',
};
function UserDetail() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const location = useLocation();
  const userPath = location.pathname.split('/').at(-1);
  const userType = linkUser[userPath];

  return (
    <UserContextProvider>
      <div className=" flex flex-col">
        <div className="w-full">
          <AdminTable userType={userType} />
        </div>
        <div className="title-content">
          <div className="text-center grid grid-cols-2 gap-4 w-full border-t-2 border-edu">
            <div className={showAdminForm ? 'border-b-2 border-edu' : ''}>
              <button
                className="text-sm font-medium my-4 bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
                onClick={() => {
                  setShowAdminForm(true);
                  setShowFileUpload(false);
                }}
              >
                {`Thêm mới ${userPath}`}
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
          userType={userPath}
          setOpen={setShowAdminForm}
        />
        <ModalUploadFile open={showFileUpload} setOpen={setShowFileUpload} />
      </div>
    </UserContextProvider>
  );
}

export default UserDetail;
