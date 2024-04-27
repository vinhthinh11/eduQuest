// import React, { useState } from 'react';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);

//   const handleSendMessage = message => {
//     setMessages([...messages, message]);
//   };

//   return (
//     <div>
//       <h1>Chat Page</h1>
//       <div>
//         {messages.map((message, index) => (
//           <div key={index}>{message}</div>
//         ))}
//       </div>
//       <input
//         type="text"
//         placeholder="Type your message..."
//         onChange={e => setMessages(e.target.value)}
//       />
//       <button onClick={() => handleSendMessage(messages)}>Send</button>
//     </div>
//   );
// };

// export default Chat;

import React, { useState, useEffect  } from 'react';
import { getAdminChatStudent, getAdminChatTeacher } from '../../services/apiChatAdmin';
import NotificationForm from './NotificationForm ';
import LoadingSpinner from '../LoadingSpinner';


const ChatMessage = ({ imgSrc, name, message, type,timeSent  }) => {
  const messageClass = type === 'in' ? 'flex-row-reverse' : 'flex-row';
  const messageBgClass = type === 'in' ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white';

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



const Chat = () => {
  const [notificationsTeacher, setNotificationsTeacher] = useState([]);
  const [notificationsStudent, setNotificationsStudent] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchNotificationsTeacher = async () => {
      try {
        const { data } = await getAdminChatTeacher();
        setNotificationsTeacher(data.data);
        console.log('««««« data »»»»»', data);
      } catch (error) {
        console.error('Error fetching notificationsTeacher:', error);
        // Handle error here
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
        console.log('««««« data »»»»»', data);
      } catch (error) {
        console.error('Error fetching notificationsTeacher:', error);
        // Handle error here
      } finally {
        setIsFetching(false);
      }
    };

    fetchNotificationsStudent();
  }, []);

  const handleSendMessage = () => {
    console.log('Sending message:', newMessage);
    setNewMessage('');
    // Handle sending message logic here
  };

  return isFetching ? (
    <LoadingSpinner />
  ) :  (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 mx-8 border-b-2 border-edu">
      <div className="col-span-1">
        <div className="card " >
          <div className="card-header bg-gray-800 text-white mb-5 rounded-t-md">
            <span className="ml-5">Thông báo giáo viên</span>
          </div>
          <div className="card-body max-h-96 overflow-y-auto" style={{ minHeight: "450px"}}>
            <ul className="chat-list h-full">
              {notificationsTeacher.map(notification => (
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
          </div>
         
        </div>
      </div>
      <div className="col-span-1">
        <div className="card ">
          <div className="card-header bg-gray-800 text-white mb-5 rounded-t-md">
            <span className="ml-5">Thông báo học sinh</span>
          </div>
          <div className="card-body max-h-96 overflow-y-auto"  style={{ minHeight: "450px" }}>
            <ul className="chat-list h-full">
              {notificationsStudent.map(notification => (
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
          </div>
       
        </div>
      </div>
    </div>
    <NotificationForm />
    </>
  );
};

export default Chat;
