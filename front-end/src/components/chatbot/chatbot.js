// ChatComponent.js
import React, { useState } from 'react';
import { chatbotAPI } from '../../services';
import './chatbot.scss';
import ChatBotIcon from '../../assets/icons/chatbot.png';
import ChatBotSendIcon from '../../assets/icons/send-message.png';

const ChatBot = () => {
    const [showChatBot, setShowChatBot] = useState(false);
    const [message, setMessage] = useState('');
    const [responses, setResponses] = useState([]);

    const handleSendMessage = () => {
        if (message === '') return;

        const queryResult = {
            queryText: message
        };

        chatbotAPI.sendMessage(queryResult)
            .then(res => {
                setResponses([...responses, { user: message, bot: res.data }]);
                setMessage('');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className='chatbot-container'>
            {showChatBot && (
                <div className='chatbot'>
                    <div className='chatbot-header'>
                        <div className='chatbot-title'>
                            TRAVEL CHATBOT
                            <span className='chatbot-user'>Nguyen Thi Cam Tu</span>
                        </div>
                        <button className='chatbot-close-btn' onClick={() => setShowChatBot(false)}>
                            <i className='fas fa-times'></i>
                        </button>
                    </div>
                    <div className='chatbot-body'>
                        {responses.map((res, index) => (
                            <div key={index} className='chatbot-item'>
                                {res.user && (
                                    <div className='chatbot-item-user'>
                                        <div className='chatbot-item-name'>
                                            Nguyễn Thị Cẩm Tú
                                        </div>
                                        <div className='chatbot-item-message'>{res.user}</div>
                                    </div>
                                )}
                                {res.bot && (
                                    <div className='chatbot-item-bot'>
                                        <div className='chatbot-item-name'>
                                            Bot
                                        </div>
                                        <div className='chatbot-item-message'>{res.bot}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='chatbot-footer'>
                        <input
                            className='chatbot-input'
                            type='text'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className='chatbot-send-btn' onClick={handleSendMessage}>
                            <img src={ChatBotSendIcon} alt='send' style={{ width: 20 }} />
                        </button>
                    </div>
                </div>
            )}

            <div className='chatbot-icon' onClick={() => setShowChatBot(!showChatBot)} >
                {showChatBot ? (
                    <i className='fas fa-times'></i>
                ) : (
                    <img src={ChatBotIcon} alt='chatbot' />
                )}

            </div>
        </div>
    );
};

export default ChatBot;