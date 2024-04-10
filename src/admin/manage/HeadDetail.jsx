import React, { useState } from 'react';
import HeadTable from '../../components/head/HeadTable';
import FormHeadModal from '../../components/head/FormHeadModal';
import UploadFileHeadModal from '../../components/head/UploadFileHeadModal';
import { UserContextProvider } from '../UserContextProvider.jsx';
function HeadDetail() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);

  return (
    <UserContextProvider>
      <div className=" min-h-full flex flex-col">
        <div className="w-full">
          <HeadTable />
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
                Thêm mới trưởng bộ môn
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
        <FormHeadModal open={showAdminForm} setOpen={setShowAdminForm} />
        <UploadFileHeadModal
          open={showFileUpload}
          setOpen={setShowFileUpload}
        />
      </div>
    </UserContextProvider>
  );
}

export default HeadDetail;
