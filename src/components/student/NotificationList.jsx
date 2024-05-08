import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Box, Modal } from "@mui/material";
import "../../assets/style.css";
import LoadingSpinner from "../LoadingSpinner";
import { getNotificationStudent } from "../../services/apiNotification";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  display: "flex",
  flexDirection: "column",
  bgcolor: "#fff",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const NotificationsPage = () => {
  const [notificationsStudent, setNotificationsStudent] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchNotificationsStudent = async () => {
      try {
        const { data } = await getNotificationStudent();
        setNotificationsStudent(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Error fetching notifications");
      } finally {
        setIsFetching(false);
      }
    };

    fetchNotificationsStudent();
  }, []);

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    setOpenModal(true);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="container mx-auto py-8 px-8">
      <h1 className="text-3xl font-bold mb-4 text-red-500 ">
        <FontAwesomeIcon icon={faBell} className="bell-icon mr-2" />
        Thông báo
      </h1>
      {isFetching ? (
        <LoadingSpinner />
      ) : (
        <ul className="divide-y divide-gray-200">
          {notificationsStudent.length === 0 ? (
            <p>Không có thông báo</p>
          ) : (
            notificationsStudent.map((notification, index) => (
              <li
                key={notification.notification_id}
                className="py-4 flex items-center"
              >
                <Link
                  to="#"
                  onClick={() => handleNotificationClick(notification)}
                  className="text-lg font-semibold"
                >
                  {notification.notification_title}
                </Link>
                {index === 0 && (
                  <p className="text-red-500 mb-4 animate-bounce ml-2">Mới</p>
                )}
                <span className="ml-3">
                  {" "}
                  ({formatDate(notification.time_sent)}){" "}
                </span>
              </li>
            ))
          )}
        </ul>
      )}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <div className="modal-content bg-gray-100 rounded-lg relative">
            <div className="px-6 py-4">
              <h3 className="text-xl font-bold text-red-500">
                {selectedNotification?.notification_title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {formatDate(selectedNotification?.time_sent)}
              </p>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 mb-8">
              <div className="px-4 py-2  text-gray-800">
                {selectedNotification?.notification_content}
              </div>
            </div>
            <div className="absolute bottom-0 right-0 mr-4 mb-2 text-gray-700">
              <span className="font-bold">Người đăng:</span>{" "}
              {selectedNotification?.name}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default NotificationsPage;


// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
// import { Box, Modal } from "@mui/material";
// import "../../assets/style.css";
// import LoadingSpinner from "../LoadingSpinner";
// import { getNotificationStudent } from "../../services/apiNotification";


// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   display: "flex",
//   flexDirection: "column",
//   bgcolor: "#fff",
//   border: "1px solid #000",
//   borderRadius: "20px",
//   boxShadow: 24,
//   p: 4,
// };

// const NotificationsPage = () => {
//   const [notificationsStudent, setNotificationsStudent] = useState([]);
//   const [isFetching, setIsFetching] = useState(true);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {
//     const fetchNotificationsStudent = async () => {
//       try {
//         const class_id = ""; // provide class_id
//         const data = await getNotificationStudent(class_id);
//         setNotificationsStudent(data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//         toast.error(error.message || "Error fetching notifications");
//       } finally {
//         setIsFetching(false);
//       }
//     };

//     fetchNotificationsStudent();
//   }, []);

//   const handleNotificationClick = (notification) => {
//     setSelectedNotification(notification);
//     setOpenModal(true);
//   };

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   return (
//     <div className="container mx-auto py-8 px-8">
//       <h1 className="text-3xl font-bold mb-4 text-red-500 ">
//         <FontAwesomeIcon icon={faBell} className="bell-icon mr-2" />
//         Thông báo
//       </h1>
//       {isFetching ? (
//         <LoadingSpinner />
//       ) : (
//         <ul className="divide-y divide-gray-200">
//           {notificationsStudent.length === 0 ? (
//             <p>Không có thông báo</p>
//           ) : (
//             notificationsStudent.map((notification, index) => (
//               <li
//                 key={notification.notification_id}
//                 className="py-4 flex items-center"
//               >
//                 <Link
//                   to="#"
//                   onClick={() => handleNotificationClick(notification)}
//                   className="text-lg font-semibold"
//                 >
//                   {notification.notification_title}
//                 </Link>
//                 {index === 0 && (
//                   <p className="text-red-500 mb-4 animate-bounce ml-2">Mới</p>
//                 )}
//                 <span className="ml-3">
//                   {" "}
//                   ({formatDate(notification.time_sent)}){" "}
//                 </span>
//               </li>
//             ))
//           )}
//         </ul>
//       )}
//       <Modal
//         open={openModal}
//         onClose={() => setOpenModal(false)}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//       >
//         <Box sx={style}>
//           <div className="modal-content bg-gray-100 rounded-lg relative">
//             <div className="px-6 py-4">
//               <h3 className="text-xl font-bold text-red-500">
//                 {selectedNotification?.notification_title}
//               </h3>
//               <p className="mt-1 text-sm text-gray-600">
//                 {formatDate(selectedNotification?.time_sent)}
//               </p>
//             </div>
//             <div className="border-t border-gray-200 px-6 py-4 mb-8">
//               <div className="px-4 py-2  text-gray-800">
//                 {selectedNotification?.notification_content}
//               </div>
//             </div>
//             <div className="absolute bottom-0 right-0 mr-4 mb-2 text-gray-700">
//               <span className="font-bold">Người đăng:</span>{" "}
//               {selectedNotification?.name}
//             </div>
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default NotificationsPage;