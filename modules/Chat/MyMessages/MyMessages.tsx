'use client';

import s from './MyMessages.module.scss';
import {
  type FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {Button, Form, Input} from 'antd';
import {io, Socket} from 'socket.io-client';
import {useUsersStore} from '@/modules/User/store';
import ChatMessage from '@/modules/Chat/ChatMessage/ChatMessage';
import {useQuery} from '@tanstack/react-query';
import {getMessagesByIdFetcher} from '@/modules/Chat/api';
import {IMessage} from '@/modules/Chat/type';
import useChat from '@/modules/Chat/hook/useChat';
import {IUser} from '@/modules/User/type';

interface MyMessagesProps {
  chatId?: string;
}

const MyMessages: FC<MyMessagesProps> = ({chatId}) => {
  const [enemyUser, setEnemyUser] = useState<IUser>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const chatContainer = useRef<HTMLDivElement>(null);

  const {socket} = useChat();
  const {user} = useUsersStore((store) => store);

  const {
    data: messagesList,
    isLoading: isMessagesLoading,
    isSuccess: isMessagedSuccessfullyLoaded
  } = useQuery(
    [chatId + 'chat'],
    () => getMessagesByIdFetcher({chatId: Number(chatId)}),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: chatId ? true : false
    }
  );

  useEffect(() => {
    if (messagesList && chatId) {
      setMessages(messagesList);
    }
  }, [isMessagedSuccessfullyLoaded]);

  useEffect(() => {
    if (socket) {
      socket.emit('joinChatById', {chatId: chatId});
      socket.on(
        'roomJoined',
        (data: {chatId: number; members: IUser[]}) => {
          setEnemyUser(data.members.shift());
        }
      );
      socket.on('newMessage', (data: IMessage) => {
        setMessages((prev) => [...prev, data]);
      });
    }
  }, [socket]);

  const sendMessage = useCallback(() => {
    if (socket) {
      socket.emit('sendMessage', {chatId: chatId, message: inputValue});
      setInputValue('');
    }
  }, [chatId, socket, inputValue]);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={s.myMessages}>
      {chatId && (
        <>
          <div className={s.chatPanel}>Чат с пользователем</div>
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
          <Form className={s.sendButton} onFinish={sendMessage}>
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
