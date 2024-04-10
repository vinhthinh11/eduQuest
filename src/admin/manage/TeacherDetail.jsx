// import React, { useState } from 'react';
// import TeachTable from '../../components/teacher/TeacherTable';
// import FormTeacherModal from '../../components/teacher/FormTeacherModal';
// import UploadFileTeacherModal from '../../components/teacher/UploadFileTeacherModal';
// function UserDetail() {
//   const [showAdminForm, setShowAdminForm] = useState(false);
//   const [showFileUpload, setShowFileUpload] = useState(false);

//   return (
//     <div className=" ">
//       <div className=" flex flex-col">
//         <div className="w-full">
//           <TeachTable />
//         </div>
//         <div className="title-content">
//           <div className="text-center grid grid-cols-2 gap-4 w-full border-t-2 border-edu">
//             <div className={showAdminForm ? 'border-b-2 border-edu' : ''}>
//               <button
//                 className="text-sm font-medium my-4 bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
//                 onClick={() => {
//                   setShowAdminForm(true);
//                   setShowFileUpload(false);
//                 }}
//               >
//                 Thêm mới giáo viên
//               </button>
//             </div>
//             <div className={showFileUpload ? 'border-b-2 border-edu' : ''}>
//               <button
//                 className="text-sm font-medium my-4 bg-customPurple text-white px-3 py-2 rounded-md hover:bg-customPurpleLight outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customPurple"
//                 onClick={() => {
//                   setShowFileUpload(true);
//                   setShowAdminForm(false);
//                 }}
//               >
//                 Thêm bằng file
//               </button>
//             </div>
//           </div>
//         </div>
//         <FormTeacherModal open={showAdminForm} setOpen={setShowAdminForm} />
//         <UploadFileTeacherModal open={showFileUpload} setOpen={setShowFileUpload} />
//       </div>
//     </div>
//   );
// }

// export default UserDetail;
