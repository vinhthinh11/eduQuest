// UserDetail.js
import React, { useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import FormModal from "../../components/admin/FormModal";
import UploadFileModal from "../../components/admin/UploadFileModal";
function UserDetail() {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);

  return (
    <div className=" ">
      <div className=" min-h-full flex flex-col">
        <div className="w-full">
          <AdminTable />
        </div>
        <div className="title-content">
          <div className="text-center grid grid-cols-2 gap-4 w-full border-t-2 border-edu">
            <div className={showAdminForm ? "border-b-2 border-edu" : ""}>
              <h1
                className="text-sm font-medium my-4 text-custom-purple"
                onClick={() => {
                  setShowAdminForm(true);
                  setShowFileUpload(false);
                }}
              >
                Thêm mới admin
              </h1>
            </div>
            <div className={showFileUpload ? "border-b-2 border-edu" : ""}>
              <h1
                className="text-sm font-medium my-4 text-custom-purple"
                onClick={() => {
                  setShowFileUpload(true);
                  setShowAdminForm(false);
                }}
              >
                Thêm bằng file
              </h1>
            </div>
          </div>
        </div>

        {/* Conditional rendering based on state */}
        <FormModal open={showAdminForm} setOpen={setShowAdminForm} />
        <UploadFileModal open={showFileUpload} setOpen={setShowFileUpload} />
      </div>
    </div>
  );
}

export default UserDetail;
