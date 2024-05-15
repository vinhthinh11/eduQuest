import React, { useState, useEffect, useRef } from "react";
import LoadingSpinner from "../LoadingSpinner";
import "../../assets/style.css";
import { format } from "date-fns";

import {
  getAllNotificationAdmin,
  getAllNotificationStudent,
  sendNotificationTeacherByStudent,
} from "../../services/apiNotificationTeacher";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { getUser } from "../../services/apiUser";
import CheckBox from "../../components/CheckBox";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  display: "flex",
  flexDirection: "column",
  bgcolor: "#fff",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const SelectedNames = ({ selected }) => {
  const selectedLabels = selected.map((item) => item.label).join(", ");
  return (
    <div>
      <span>
        {selected.map((item, index) => (
          <span key={index}>
            {item.label}
            {index < selected.length - 1 ? ", " : "."}
          </span>
        ))}
      </span>
    </div>
  );
};

// Define or import the ChatMessage component
const ChatMessage = ({ imgSrc, name, message, type, timeSent }) => {
  const messageClass = type === "in" ? "flex-row-reverse" : "flex-row";
  const messageBgClass =
    type === "in" ? "bg-blue-500 text-white" : "bg-blue-500 text-white";

  // Định dạng lại thời gian
  const formattedTime = format(new Date(timeSent), "hh:mm a");

  return (
    <li className={`flex items-center mb-4 ${messageClass}`}>
      <div className="chat-img">
        <img alt="Avatar" src={imgSrc} className="rounded-full w-12" />
      </div>
      <div
        className={`chat-body ml-2 mr-2 ${messageBgClass} p-3 max-w-sm rounded-xl`}
      >
        <h5 className="font-bold mb-1">{name}</h5>
        <p className="text-sm">{message}</p>
        {timeSent && (
          <span className="text-xs text-white-600 mt-1">{formattedTime}</span>
        )}
      </div>
    </li>
  );
};


const SendNotificationTeacher = () => {
  const [notificationsAdmin, setNotificationsAdmin] = useState([]);
  const [notificationsStudent, setNotificationsStudent] = useState([]);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationContent, setNotificationContent] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const messagesEndRefTeacher = useRef(null);
  const messagesEndRefStudent = useRef(null);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [openClassModal, setOpenClassModal] = useState(false);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchNotificationsStudent = async () => {
      try {
        const { data } = await getAllNotificationStudent();
        setNotificationsStudent(data.notifications || []);
      } catch (error) {
        console.error("Error fetching notificationsStudent:", error);
      }
    };

    fetchNotificationsStudent();
  }, []);

  useEffect(() => {
    const fetchNotificationsAdmin = async () => {
      try {
        const { data } = await getAllNotificationAdmin();
        console.log('««««« data »»»»»', data);
        setNotificationsAdmin(data.notifications || []);
      } catch (error) {
        console.error("Error fetching notificationsAdmin:", error);
      }
    };

    fetchNotificationsAdmin();
  }, []);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesResponse = await getUser("/teacher/class/get");
        if (classesResponse.data && classesResponse.data.data) {
          const classOptions = classesResponse.data.data.map((classItem) => ({
            value: classItem.class_id,
            label: classItem.class_name,
          }));
          setClasses(classOptions);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClasses();
  }, []);

  const resetFormFields = () => {
    setNotificationTitle("");
    setNotificationContent("");
  };

  const handleSendTeacher = async () => {
    try {
      setIsFetching(true);
      const classIds = selectedClasses.map(classItem => classItem.value);
      const notificationData = {
        class_id: classIds,
        notification_title: notificationTitle,
        notification_content: notificationContent,
      };
      await sendNotificationTeacherByStudent(notificationData);
      setIsFetching(false);
      const { data } = await getAllNotificationStudent();
      setNotificationsStudent(data.notifications || []);
      resetFormFields();
      scrollToBottom(messagesEndRefTeacher);
      setSelectedClasses([]);
    } catch (error) {
      console.error("Error sending teacher notification:", error);
      setIsFetching(false);
    }
  };
  
  const scrollToBottom = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom(messagesEndRefTeacher);
  }, [notificationsAdmin]);

  useEffect(() => {
    scrollToBottom(messagesEndRefStudent);
  }, [notificationsStudent]);

  return isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className="grid grid-cols-2 gap-4 px-0">
      <div className="flex">
        <div className="px-4 py-5 chat-box bg-white flex-1">
          <div className="card shadow-md">
            <div className="card-header bg-red-500 text-white rounded-t-md py-2">
              <span className="ml-5">Thông Báo Nhận Từ Admin</span>
            </div>
            <div
              className="card-body max-h-96 overflow-y-auto mt-4"
              style={{ minHeight: "450px" }}
            >
              <ul className="chat-list h-full">
                {notificationsAdmin.map((notification) => (
                  
                  <ChatMessage
                    key={notification.notification_id}
                    imgSrc="https://bootdey.com/img/Content/avatar/avatar1.png"
                    name={notification.name}
                    message={notification.notification_content}
                    timeSent={notification.time_sent}
                    type="out"
                  />
                ))}
              </ul>
              <div ref={messagesEndRefTeacher} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="px-4 py-5 chat-box bg-white flex-1">
          <div className="card shadow-md">
            <div className="card-header bg-red-500 text-white rounded-t-md py-2">
              <span className="ml-5">Thông Báo Đến Học Sinh</span>
            </div>
            <div
              className="card-body max-h-96 overflow-y-auto mt-4"
              style={{ minHeight: "450px" }}
            >
              <ul className="chat-list h-full">
                {notificationsStudent.map((notification) => (
                  <ChatMessage
                    key={notification.notification_id}
                    imgSrc="https://bootdey.com/img/Content/avatar/avatar1.png"
                    name={notification.name}
                    message={notification.notification_content}
                    timeSent={notification.time_sent}
                    type="out"
                  />
                ))}
              </ul>
              <div ref={messagesEndRefStudent} />
            </div>
          </div>
        </div>
      </div>
      <form
        action="#"
        className="bg-light ml-4 mb-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendTeacher();
        }}
      >
        <div className="input-group mt-4">
          <input
            type="text"
            placeholder="Chủ đề"
            className="form-control rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            value={notificationTitle}
            onChange={(e) => setNotificationTitle(e.target.value)}
          />
        </div>
        <div className="input-group mt-4">
          <textarea
            placeholder="Nội dung"
            className="form-control rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
            value={notificationContent}
            onChange={(e) => setNotificationContent(e.target.value)}
          />
        </div>
        <div className="mb-3 flex border-b-2 border-edu mt-4">
          <button
            className="btn btn-primary mr-2 font-bold"
            onClick={(e) => {
              e.preventDefault(); // Ngăn chặn hành động mặc định của nút
              setOpenClassModal(true);
            }}
          >
            Chọn lớp
          </button>

          <Modal
            open={openClassModal}
            onClose={() => setOpenClassModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={style}>
              <div className="modal-content">
                <CheckBox
                  label="Lớp"
                  value={selectedClasses}
                  onChange={(value) => {
                    setSelectedClasses(value);
                  }}
                  options={classes}
                />
              </div>
            </Box>
          </Modal>
          <SelectedNames selected={selectedClasses} />
        </div>
        <div className="input-group mt-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-500 focus:outline-none"
          >
            Send Notification
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendNotificationTeacher;

