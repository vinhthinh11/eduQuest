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
            setMessages(prevMessages => [
                ...prevMessages,
                { id: prevMessages.length + 1, content: inputValue }
            ]);
            // Xóa giá trị đang nhập
            setInputValue('');
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className="title-content flex items-center justify-between">
                <span className="title">Trò Chuyện</span>
                <a href="index.php?action=show_all_chat" className="cursor"><span className="title">Xem Lịch Sử Chat</span></a>
            </div>
            <div className="block-content overflow-hidden h-96">
                <div className="content">
                    <div className="preload hidden" id="preload">
                        <img src="res/img/loading.gif" alt="" />
                    </div>
                    <div className="notification_content overflow-y-scroll scrollbar" style={{ maxHeight: '410px' }}>
                        {/* Hiển thị tin nhắn */}
                        {messages.map(message => (
                            <div key={message.id} className="message">
                                <p>{message.content}</p>
                            </div>
                        ))}
                        {/* Phần tử dùng để tự động cuộn xuống dòng mới nhất */}
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
