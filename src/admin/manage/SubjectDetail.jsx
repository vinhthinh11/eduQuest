import React, { useState } from 'react';
import SubjectTable from '../../components/subject/SubjectTable.jsx';
import FormSubjectModal from '../../components/subject/FormSubJectModal.jsx';
import { UserContextProvider } from '../UserContextProvider.jsx';
function SubjectDetail() {
  const [showAdminForm, setShowAdminForm] = useState(false);

  return (
    <UserContextProvider>
      <div className=" flex flex-col">
        <div className="w-full">
          <SubjectTable />
        </div>
        <div className="title-content">
          <div className="text-center grid grid-cols-2 gap-4 w-full border-t-2 border-edu">
            <div>
              <button
                className="text-sm font-medium my-4 bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
                onClick={() => {
                  setShowAdminForm(true);
                }}
              >
                Thêm mới trưởng bộ môn
              </button>
            </div>
            
          </div>
        </div>
        <FormSubjectModal open={showAdminForm} setOpen={setShowAdminForm} />
       
      </div>
    </UserContextProvider>
  );
}

export default SubjectDetail;
