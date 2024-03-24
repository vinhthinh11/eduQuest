import React from 'react'; // Add this import

import AdminForm from '../../components/AdminForm';
import UploadFile from '../../components/UploadFile';
import AdminTable from '../../components/AdminTable';


function UserDetail() {
  const [showAdminForm, setShowAdminForm] = React.useState(true); 
  const [showFileUpload, setShowFileUpload] = React.useState(false);

  const handleAdminFormClick = () => {
    setShowAdminForm(true);
    setShowFileUpload(false);
  };

  const handleFileUploadClick = () => {
    setShowFileUpload(true);
    setShowAdminForm(false);
  };

  return (
    <div className="flex w-full min-h-full">
      <div className=" w-full min-h-full flex flex-col">
        {/* Main content */}
        <div className="w-full">
          <AdminTable />
        </div>
        <div className="title-content">
  
          {/* Control buttons */}
          <div className='text-center grid grid-cols-2 gap-4 w-full border-t-2 border-edu'>
            <div className={showAdminForm ? "border-b-2 border-edu" : ""}>
              <h1 className="text-sm font-medium my-4 text-custom-purple" onClick={handleAdminFormClick}>Thêm mới admin</h1>
            </div>
            <div className={showFileUpload ? "border-b-2 border-edu" : ""}>
              <h1 className="text-sm font-medium my-4 text-custom-purple" onClick={handleFileUploadClick}>Thêm bằng file</h1>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on state */}
        {showAdminForm && <AdminForm />}
        {showFileUpload && <UploadFile />}
      </div>
    </div>
  );
}

export default UserDetail;
