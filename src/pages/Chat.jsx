import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = message => {
    setMessages([...messages, message]);
  };

  return (
    <div>
      <h1>Chat Page</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        onChange={e => setMessages(e.target.value)}
      />
      <button onClick={() => handleSendMessage(messages)}>Send</button>
    </div>
  );
};

export default Chat;
