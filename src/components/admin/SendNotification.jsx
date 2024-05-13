import React, { useState, useEffect, useRef } from "react";
import { getAdminChatStudent, getAdminChatTeacher } from "../../services/apiChatAdmin";
import LoadingSpinner from "../LoadingSpinner";
import "../../assets/style.css";
import { sendNotificationClass, sendNotificationTeacher } from "../../services/apiNotification";

const ChatMessage = ({ imgSrc, name, message, type, timeSent }) => {
  const messageClass = type === "in" ? "flex-row-reverse" : "flex-row";
  const messageBgClass = type === "in" ? "bg-blue-500 text-white" : "bg-blue-500 text-white";

  return (
    <li className={`flex items-center mb-4 ${messageClass}`}>
      <div className="chat-img">
        <img alt="Avatar" src={imgSrc} className="rounded-full w-12" />
      </div>
      <div className={`chat-body ml-2 mr-2 ${messageBgClass} p-3 max-w-sm rounded-xl`}>
        <h5 className="font-bold mb-1">{name}</h5>
        <p className="text-sm">{message}</p>
        {timeSent && <span className="time-sent text-sm">[{timeSent}]</span>}
      </div>
    </li>
  );
};

const SendNotification = () => {
  const [notificationsTeacher, setNotificationsTeacher] = useState([]);
  const [notificationsStudent, setNotificationsStudent] = useState([]);
  const [teacherNotificationTitle, setTeacherNotificationTitle] = useState("");
  const [teacherNotificationContent, setTeacherNotificationContent] = useState("");
  const [studentNotificationTitle, setStudentNotificationTitle] = useState("");
  const [studentNotificationContent, setStudentNotificationContent] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const messagesEndRefTeacher = useRef(null);
  const messagesEndRefStudent = useRef(null);

  useEffect(() => {
    const fetchNotificationsTeacher = async () => {
      try {
        const { data } = await getAdminChatTeacher();
        setNotificationsTeacher(data.data);
      } catch (error) {
        console.error("Error fetching notificationsTeacher:", error);
      }
    };

    fetchNotificationsTeacher();
  }, []);

  useEffect(() => {
    const fetchNotificationsStudent = async () => {
      setIsFetching(true);
      try {
        const { data } = await getAdminChatStudent();
        setNotificationsStudent(data.data);
      } catch (error) {
        console.error("Error fetching notificationsStudent:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchNotificationsStudent();
  }, []);

  const resetFormFields = () => {
    setTeacherNotificationTitle("");
    setTeacherNotificationContent("");
    setStudentNotificationTitle("");
    setStudentNotificationContent("");
  };

  const handleSendStudent = async () => {
    try {
      setIsFetching(true);
      const notificationData = {
        notification_title: studentNotificationTitle,
        notification_content: studentNotificationContent,
      };
      await sendNotificationClass(notificationData);
      setIsFetching(false);
      const { data } = await getAdminChatStudent();
      setNotificationsStudent(data.data);
      resetFormFields();
      scrollToBottom(messagesEndRefStudent);
    } catch (error) {
      console.error("Error sending student notification:", error);
      setIsFetching(false);
    }
  };

  const handleSendTeacher = async () => {
    try {
      setIsFetching(true);
      const notificationData = {
        notification_title: teacherNotificationTitle,
        notification_content: teacherNotificationContent,
      };
      await sendNotificationTeacher(notificationData);
      setIsFetching(false);
      const { data } = await getAdminChatTeacher();
      setNotificationsTeacher(data.data);
      resetFormFields();
      scrollToBottom(messagesEndRefTeacher);
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
  }, [notificationsTeacher]);

  useEffect(() => {
    scrollToBottom(messagesEndRefStudent);
  }, [notificationsStudent]);

  return isFetching ? (
    <LoadingSpinner />
  ) : (
    <div className="grid grid-cols-2 gap-4 px-0">
      <div>
        <div className="px-4 py-5 chat-box bg-white">
          <div className="card shadow-md">
            <div className="card-header bg-red-500 text-white rounded-t-md py-2">
              <span className="ml-5">Thông báo giáo viên</span>
            </div>
            <div
              className="card-body max-h-96 overflow-y-auto mt-4"
              style={{ minHeight: "450px" }}
            >
              <ul className="chat-list h-full">
                {notificationsTeacher.map((notification) => (
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
          <form
            action="#"
            className="bg-light mt-4"
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
                value={teacherNotificationTitle}
                onChange={(e) => setTeacherNotificationTitle(e.target.value)}
              />
            </div>
            <div className="input-group mt-4">
              <textarea
                placeholder="Nội dung"
                className="form-control rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                value={teacherNotificationContent}
                onChange={(e) => setTeacherNotificationContent(e.target.value)}
              />
            </div>
            <div className="input-group mt-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-500 focus:outline-none"
              >
                Send Notification To Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="px-4 py-5 chat-box bg-white">
          <div className="card shadow-md">
            <div className="card-header bg-red-500 text-white rounded-t-md py-2">
              <span className="ml-5">Thông báo học sinh</span>
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
          <form
            action="#"
            className="bg-light mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendStudent();
            }}
          >
            <div className="input-group mt-4">
              <input
                type="text"
                placeholder="Chủ đề"
                className="form-control rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                value={studentNotificationTitle}
                onChange={(e) => setStudentNotificationTitle(e.target.value)}
              />
            </div>
            <div className="input-group mt-4">
              <textarea
                placeholder="Nội dung"
                className="form-control rounded-l-lg border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                value={studentNotificationContent}
                onChange={(e) => setStudentNotificationContent(e.target.value)}
              />
            </div>
            <div className="input-group mt-4">
              <button
                type="submit"
                className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-500 focus:outline-none"
              >
                Send Notification To Student
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
