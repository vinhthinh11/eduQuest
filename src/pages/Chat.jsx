// import React, { useState } from 'react';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);

//   const handleSubmit = e => {
//     e.preventDefault();
//   };

//   return (
//     <div>
//       <header class="bg-blue-500 py-4 px-8 text-white">
//         <h1 class="text-lg font-semibold">Chat với học sinh trong lớp</h1>
//       </header>

//       <div class="flex-1 overflow-y-auto px-8 py-4">
//         <div class="flex flex-col space-y-4">
//           <div class="flex items-start">
//             <div class="flex-shrink-0">
//               <img
//                 class="h-8 w-8 rounded-full"
//                 src="https://randomuser.me/api/portraits/men/1.jpg"
//                 alt="User"
//               />
//             </div>
//             <div class="ml-3">
//               <div class="bg-gray-200 rounded-lg px-4 py-2">
//                 <p class="text-sm">Các em nộp bài xong chua?</p>
//               </div>
//               <p class="text-xs text-gray-500 mt-1">John • 10:30 AM</p>
//             </div>
//           </div>

//           <div class="flex items-end justify-end">
//             <div class="mr-3">
//               <div class="bg-blue-500 rounded-lg px-4 py-2 text-white">
//                 <p class="text-sm">Dạ xong rồi cô!</p>
//               </div>
//               <p class="text-xs text-gray-500 mt-1 text-right">
//                 You • 10:32 AM
//               </p>
//             </div>
//             <img
//               class="h-8 w-8 rounded-full"
//               src="https://randomuser.me/api/portraits/women/1.jpg"
//               alt="User"
//             />
//           </div>
//         </div>
//       </div>

//       <footer class="bg-white px-8 py-4">
//         <form className="flex" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             class="flex-1 border rounded-full py-2 px-4 mr-2 focus:outline-none focus:border-blue-500"
//             placeholder="Type a message..."
//           />
//           <button
//             type="submit"
//             class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
//           >
//             Send
//           </button>
//         </form>
//       </footer>
//     </div>
//   );
// };
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import {
  getAllChatStudent,
  sendNotificationTeacher,
} from "../services/apiChatStudent";
import "../assets/style.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    if (isScrolledToBottom) scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = document.querySelector(".overflow-y-auto");
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleScroll = () => {
    const container = document.querySelector(".overflow-y-auto");
    if (container) {
      const atBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setIsScrolledToBottom(atBottom);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchMessages = async () => {
    try {
      const response = await getAllChatStudent();
      setMessages(
        response.data.reverse().map((message) => ({
          ...message,
          time_sent: format(new Date(message.time_sent), "h:mm a"),
        }))
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bearerToken = localStorage.getItem("token");
      await sendNotificationTeacher({ chat_content: newMessage });
      console.log("Message sent successfully");
      fetchMessages();
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err.message);
    }
  };

  return (
    <div className="flex flex-col max-h-97">
      <header className="bg-blue-500 py-4 px-8 text-white">
        <h1 className="text-lg font-semibold">Chat với học sinh trong lớp</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-8 py-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message mb-4 flex items-start ${
              message.name === message.name ? "justify-end" : "justify-start"
            }`}
          >
           
            <div className="ml-3">
              <div className="bg-blue-500 rounded-lg px-4 py-2 text-white max-w-xs">
                <p className="text-sm">{message.chat_content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 text-right">
                {message.name} • {message.time_sent}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <footer className="bg-white px-8 py-4">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            className="flex-1 border rounded-full py-2 px-4 mr-2 focus:outline-none focus:border-blue-500"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
