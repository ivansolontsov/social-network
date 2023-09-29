'use client';

import s from './MyMessages.module.scss';
import {type FC, memo, useCallback, useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {Button, Input} from 'antd';
import {getCookie} from 'cookies-next';
import {io, Socket} from 'socket.io-client';
import {IUser} from '@/modules/User/type';

interface MyMessagesProps {}

const MyMessages: FC<MyMessagesProps> = ({}) => {
  const params = useParams();
  const [messages, setMessages] = useState<
    {chatId: number; ownerId: number; message: string}[]
  >([]);
  const [socket, setSocket] = useState<Socket>({} as Socket);
  const [chatId, setChatId] = useState<number>();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const newSocket: Socket = io('ws://localhost:9000/chats', {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${getCookie('accessToken')}`
          }
        }
      }
    });

    setSocket(newSocket);
    newSocket.emit('joinChat', {userId: params.userId});
    newSocket.on(
      'roomJoined',
      (data: {chatId: number; members: IUser[]}) => {
        setChatId(data.chatId);
        console.log(data);
      }
    );

    newSocket.on(
      'newMessage',
      (data: {chatId: number; ownerId: number; message: string}) => {
        setMessages((prev) => [
          ...prev,
          {
            chatId: data.chatId,
            ownerId: data.ownerId,
            message: data.message
          }
        ]);
      }
    );

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const sendMessage = useCallback(() => {
    if (socket) {
      socket.emit('sendMessage', {chatId: chatId, message: inputValue});
      setInputValue('');
    }
  }, [chatId, socket, inputValue]);

  return (
    <section className={s.myMessages}>
      <h1>Чат с пользователем {params.userId}</h1>
      <ul>
        {messages.map((e, i) => (
          <li>
            {e.ownerId}:{e.message}
          </li>
        ))}
      </ul>
      <Input.TextArea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        size={'large'}
      />
      <Button block type={'primary'} onClick={sendMessage}>
        Send
      </Button>
      <span>CHATID: {chatId && chatId}</span>
    </section>
  );
};

export default memo(MyMessages);
