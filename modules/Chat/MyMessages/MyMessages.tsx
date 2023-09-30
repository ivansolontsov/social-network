'use client';

import s from './MyMessages.module.scss';
import {
  type FC,
  memo,
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react';
import {useParams} from 'next/navigation';
import {Button, Form, Input} from 'antd';
import {getCookie} from 'cookies-next';
import {io, Socket} from 'socket.io-client';
import {IUser} from '@/modules/User/type';
import clsx from 'clsx';
import {useUsersStore} from '@/modules/User/store';
import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import ChatMessage from '@/modules/Chat/ChatMessage/ChatMessage';
import {useQuery} from '@tanstack/react-query';
import {getMessagesByIdFetcher} from '@/modules/Chat/api';
import {IMessage} from '@/modules/Chat/type';

interface MyMessagesProps {}

const MyMessages: FC<MyMessagesProps> = ({}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<Socket>({} as Socket);
  const [chatId, setChatId] = useState<number>();
  const [inputValue, setInputValue] = useState('');
  const chatContainer = useRef<HTMLDivElement>(null);
  const params = useParams();

  const {user} = useUsersStore((store) => store);

  const {
    data: messagesList,
    isLoading: isMessagesLoading,
    isSuccess: isMessagedSuccesfullyLoaded
  } = useQuery(
    [params.chatId + 'chat'],
    () => getMessagesByIdFetcher({chatId: Number(params.chatId)}),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false
    }
  );

  useEffect(() => {
    if (messagesList) {
      setMessages(messagesList);
    }
  }, [isMessagedSuccesfullyLoaded]);

  // useEffect(() => {
  //   const newSocket: Socket = io('ws://localhost:9000/chats', {
  //     transportOptions: {
  //       polling: {
  //         extraHeaders: {
  //           Authorization: `Bearer ${getCookie('accessToken')}`
  //         }
  //       }
  //     }
  //   });
  //
  //   setSocket(newSocket);
  //   newSocket.emit('joinChatById', {chatId: params.chatId});
  //   newSocket.on(
  //     'roomJoined',
  //     (data: {chatId: number; members: IUser[]}) => {
  //       setChatId(data.chatId);
  //       console.log(data);
  //     }
  //   );
  //
  //   newSocket.on(
  //     'newMessage',
  //     (data: {chatId: number; ownerId: number; message: string}) => {
  //       setMessages((prev) => [
  //         ...prev,
  //         {
  //           chatId: data.chatId,
  //           ownerId: data.ownerId,
  //           message: data.message
  //         }
  //       ]);
  //     }
  //   );
  //
  //   return () => newSocket.close();
  // }, []);

  // const sendMessage = useCallback(() => {
  //   if (socket) {
  //     socket.emit('sendMessage', {chatId: chatId, message: inputValue});
  //     setInputValue('');
  //   }
  // }, [chatId, socket, inputValue]);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={s.myMessages}>
      {params.chatId && (
        <>
          <div className={s.chatPanel}>
            Чат с пользователем {params.userId}
          </div>
          <div className={s.chat}>
            <div className={s.chatMessagesContainer} ref={chatContainer}>
              <ul className={s.chatMessages}>
                {!isMessagesLoading &&
                  messages.map((e, i) => (
                    <ChatMessage
                      key={e.id}
                      message={e.message}
                      isEnemyMessage={user.id !== e.userId}
                      avatar={e.avatar}
                      name={e.name}
                      userId={e.userId}
                      time={e.createdAt}
                    />
                  ))}
              </ul>
            </div>
          </div>
          <Form className={s.sendButton}>
            <Input
              placeholder={'Напишите сообщение и нажмите Enter'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              size={'large'}
            />
            <Button type={'primary'} size={'large'}>
              Отправить
            </Button>
          </Form>
        </>
      )}
    </div>
  );
};

export default memo(MyMessages);
