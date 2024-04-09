// import { useState } from 'react';
// import Modal from '@mui/material/Modal';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import InputDefault from '../InputDefault.jsx';
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   display: 'flex',
//   flexDirection: 'column',
//   bgcolor: '#fff',
//   border: '1px solid #000',
//   borderRadius: '20px',
//   boxShadow: 24,
//   p: 4,
// };
// // const user = { name, username, password, gender, birthday ,email};
// export default function ModalCreate({ open, setOpen }) {
//   const [user, setUser] = useState({ gender: 1 });
//   const handleClose = () => setOpen(false);

//   const handleInputChange = (e, field) => {
//     setUser(pre => ({ ...pre, [field]: e.target.value }));
//   };

//   const handleConfirm = () => {
//     console.log(user);
//     // setOpen(false);
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <Typography
//           id="modal-modal-title"
//           sx={{
//             textAlign: 'center',
//             fontSize: '16px',
//             fontWeight: 'bold',
//             color: 'grey.800',
//           }}
//         >
//           THÊM MỚI GIÁO VIÊN
//         </Typography>
//         <InputDefault
//           label="Tên"
//           name="name"
//           type="text"
//           onChange={e => handleInputChange(e, 'name')}
//           value={user.name}
//         />
//         <InputDefault
//           label="Email"
//           name="email"
//           type="email"
//           onChange={e => handleInputChange(e, 'email')}
//           value={user.email}
//         />
//         <InputDefault
//           label="Password"
//           name="password"
//           type="password"
//           onChange={e => handleInputChange(e, 'password')}
//           value={user.password}
//         />
//         <InputDefault
//           label="Gender"
//           name="gender"
//           type="text"
//           onChange={e => handleInputChange(e, 'gender')}
//           value={user.gender}
//         />
//         <InputDefault
//           label="Birthday"
//           name="birthday"
//           type="date"
//           onChange={e => handleInputChange(e, 'birthday')}
//           value={user.birthday}
//         />

//         <div className="flex justify-end gap-4 mt-4">
//           <button
//             onClick={handleClose}
//             className="btn bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//           >
//             Quay lại
//           </button>
//           <button
//             onClick={handleConfirm}
//             className="btn bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
//           >
//             Đồng ý
//           </button>
//         </div>
//       </Box>
//     </Modal>
//   );
// }
