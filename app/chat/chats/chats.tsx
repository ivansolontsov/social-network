'use client';
import {type FC, memo, useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {getCookie} from 'cookies-next';

interface ChatsProps {}

const Chats: FC<ChatsProps> = ({}) => {
  const [socket, setSocket] = useState<Socket>({} as Socket);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const newSocket: Socket = io('http://localhost:9000/chats', {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${getCookie('accessToken')}`
          }
        }
      }
    });

    setSocket(newSocket);
    newSocket.emit('joinChat', {chatId: 8});
    newSocket.on('newMessage', (data) => {
      console.log(data);
    });

    return () => newSocket.close();
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit('sendMessage', {receiverId: 3, message: inputValue});
      setInputValue('');
    }
  };

  return (
    <div>
      <div>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default memo(Chats);
