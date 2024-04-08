import React, { useState } from 'react';
import ClassTable from '../../components/class/ClassTable';
import FormClassModal from '../../components/class/FormClassModal';
import UploadFileClassModal from '../../components/class/UploadFileClassModal';
function UserDetail() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);

  return (
    <div className=" ">
      <div className=" min-h-full flex flex-col">
        <div className="w-full">
          <ClassTable />
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
                Thêm mới lớp
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
        <FormClassModal open={showAdminForm} setOpen={setShowAdminForm} />
        <UploadFileClassModal open={showFileUpload} setOpen={setShowFileUpload} />
      </div>
    </div>
  );
}

export default UserDetail;
