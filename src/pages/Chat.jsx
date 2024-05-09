import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div>
      <header class="bg-blue-500 py-4 px-8 text-white">
        <h1 class="text-lg font-semibold">Chat với học sinh trong lớp</h1>
      </header>

      <div class="flex-1 overflow-y-auto px-8 py-4">
        <div class="flex flex-col space-y-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <img
                class="h-8 w-8 rounded-full"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User"
              />
            </div>
            <div class="ml-3">
              <div class="bg-gray-200 rounded-lg px-4 py-2">
                <p class="text-sm">Các em nộp bài xong chua?</p>
              </div>
              <p class="text-xs text-gray-500 mt-1">John • 10:30 AM</p>
            </div>
          </div>

          <div class="flex items-end justify-end">
            <div class="mr-3">
              <div class="bg-blue-500 rounded-lg px-4 py-2 text-white">
                <p class="text-sm">Dạ xong rồi cô!</p>
              </div>
              <p class="text-xs text-gray-500 mt-1 text-right">
                You • 10:32 AM
              </p>
            </div>
            <img
              class="h-8 w-8 rounded-full"
              src="https://randomuser.me/api/portraits/women/1.jpg"
              alt="User"
            />
          </div>
        </div>
      </div>

      <footer class="bg-white px-8 py-4">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            class="flex-1 border rounded-full py-2 px-4 mr-2 focus:outline-none focus:border-blue-500"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
