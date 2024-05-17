import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== '') {
            // Thêm tin nhắn mới vào danh sách
            setMessages([...messages, { id: messages.length + 1, content: inputValue }]);
            // Xóa giá trị đang nhập
            setInputValue('');
        }
    };

    // Tự động cuộn xuống dòng mới nhất khi có tin nhắn mới
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div>
            <div className="title-content flex items-center justify-between">
                <span className="title">Trò Chuyện</span>
                <a href="index.php?action=show_all_chat" className="cursor"><span className="title">Xem Lịch Sử Chat</span></a>
            </div>
            <div className="block-content overflow-hidden scrollbar h-96">
                <div className="content">
                    <div className="preload hidden" id="preload">
                        <img src="res/img/loading.gif" alt="" />
                    </div>
                    <div id="student_chats" className="notification_content overflow-y-auto scrollbar" style={{ height: '410px' }}>
                        {/* Hiển thị tin nhắn */}
                        {messages.map(message => (
                            <div key={message.id} className="message">
                                <p>{message.content}</p>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
                <div className="chat mt-4">
                    <form onSubmit={handleSubmit}>
                        <div className="input-field">
                            <label htmlFor="content" className="active" id="label-chat">Nhập nội dung (Enter để gửi)</label>
                            <input 
                                type="text" 
                                name="content" 
                                id="content" 
                                value={inputValue}
                                onChange={handleInputChange}
                                autoFocus 
                                className="border border-gray-300 px-2 py-1 rounded-md w-full focus:outline-none focus:border-blue-400" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;
