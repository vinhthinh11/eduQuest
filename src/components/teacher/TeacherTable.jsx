// import { useEffect, useRef, useState } from 'react';
// import { getUser } from '../../services/apiUser.js';
// import ModalEditTeacher from './ModalEditTeacher.jsx';
// import ModalDelete from '../ModalDelete.jsx';
// import SearchComponent from '../SearchComponent.jsx';
// import toast from 'react-hot-toast';

// const TeacherTable = () => {
//   const [users, setUsers] = useState([]);
//   const [perPage, setPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   // State để mở modal edit và delete
//   const [openEdit, setOpenEdit] = useState(false);
//   const [openDelete, setOpenDelete] = useState(false);
//   // State để lưu thông tin user cần sửa hoặc xoá
//   const [currentUser, setCurrentUser] = useState({});
//   const usersData = useRef([]);

//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         const { data } = await getUser('/admin/teacher/get');
//         console.log(data);
//         // setUsers(data.data);
//         // usersData.current = data.data;
//       } catch (err) {
//         // toast.error(err.message);
//       }
//     }
//     fetchUser();
//   }, []);

//   // Các hàm xử lý phân trang và thay đổi số lượng item trên trang
//   const handlePerPageChange = e => {
//     setPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   // const totalPages = Math.ceil(users?.length / perPage) || 1;
//   // const visibleUsers = users?.slice(
//   //   (currentPage - 1) * perPage,
//   //   currentPage * perPage
//   // );

//   const handlePrevPage = () => {
//     setCurrentPage(prevPage => prevPage - 1);
//   };

//   const handleNextPage = () => {
//     setCurrentPage(prevPage => prevPage + 1);
//   };

//   return (
//     <div className="content">
//       <div className="preload hidden" id="preload">
//         <img src="#" alt="" />
//       </div>
//       <div className="flex justify-between items-center border-b-2 border-edu py-3 pl-3 pr-3">
//         <div>
//           <label htmlFor="perPage">Hiển thị </label>
//           <select id="perPage" value={perPage} onChange={handlePerPageChange}>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//             <option value={30}>30</option>
//           </select>
//         </div>
//         <SearchComponent
//           usersData={usersData.current}
//           users={users}
//           setUsers={setUsers}
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <table
//           className="min-w-full divide-y divide-gray-200"
//           id="table_admins"
//         >
//           <thead className="bg-gray-50 text-slate-700">
//             <tr>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 ID
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Avatar
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Tên
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Tài Khoản
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Email
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Giới Tính
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium  uppercase tracking-wider"
//               >
//                 Ngày Sinh
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 Online Cuối
//               </th>
//               <th
//                 scope="col"
//                 className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wider"
//               >
//                 <p className="material-icons">settings</p>
//               </th>
//             </tr>
//           </thead>
//           <tbody
//             className="bg-white divide-y divide-gray-200 "
//             id="list_admins"
//           >
//             {visibleUsers.map(user => (
//               <tr key={user.teacher_id}>
//                 <td className="px-3 py-4 whitespace-wrap">{user.teacher_id}</td>
//                 <td className="px-3 py-4 whitespace-wrap">
//                   <img
//                     className="w-10 h-10 rounded-full"
//                     src={`https://i.pravatar.cc/${
//                       Math.floor(Math.random() * 500) + 1
//                     }`}
//                     alt={user.name}
//                   />
//                 </td>
//                 <td className="px-3 py-4 break-all">{user.name}</td>
//                 <td className="px-3 py-4 break-all">{user.username}</td>
//                 <td className="px-3 py-4 break-all">{user.email}</td>
//                 <td className="px-3 py-4 break-all">
//                   {user.gender_id === 1
//                     ? 'Nam'
//                     : user.gender_id === 2
//                     ? 'Nữ'
//                     : 'Không xác định'}
//                 </td>
//                 <td className="px-3 py-4 break-all">{user.birthday}</td>
//                 <td className="px-3 py-4 break-all">
//                   {new Date(user.last_login).toLocaleDateString('vn-VN')}
//                 </td>
//                 <td className="px-3 py-4 whitespace-nowrap">
//                   <div className="flex flex-col">
//                     <button
//                       className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
//                       onClick={() => {
//                         setCurrentUser(user);
//                         setOpenEdit(true);
//                       }}
//                     >
//                       Sửa
//                     </button>
//                     <button
//                       className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//                       onClick={() => {
//                         setCurrentUser(user);
//                         setOpenDelete(true); // Mở modal delete khi ấn vào nút "Xoá"
//                       }}
//                     >
//                       Xoá
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <ModalEditTeacher
//           open={openEdit}
//           setOpen={setOpenEdit}
//           user={currentUser}
//         />
//         <ModalDelete
//           open={openDelete}
//           setOpen={setOpenDelete}
//           user={currentUser}
//         />
//       </div>
//       <div className="flex justify-end px-10 border-t-2 border-black pt-4">
//         <div className="pagination pb-3 flex gap-2">
//           <button
//             className="min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
//             onClick={handlePrevPage}
//             // disabled={currentPage === 1}
//           >
//             Trước
//           </button>
//           <button
//             disabled
//             className="bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
//           >
//             {/* {`${currentPage}/${totalPages}`} */}
//           </button>
//           <button
//             className=" min-w-20 bg-customPurple hover:bg-customPurpleLight text-white py-2 px-4 rounded-md"
//             onClick={handleNextPage}
//             // disabled={currentPage === totalPages}
//           >
//             Sau
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherTable;
