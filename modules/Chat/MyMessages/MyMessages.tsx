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
import {Avatar, Button, Form, Input, message} from 'antd';
import {io, Socket} from 'socket.io-client';
import {useUsersStore} from '@/modules/User/store';
import ChatMessage from '@/modules/Chat/ChatMessage/ChatMessage';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {getMessagesByIdFetcher} from '@/modules/Chat/api';
import {IMessage} from '@/modules/Chat/type';
import {IUser} from '@/modules/User/type';
import useCustomDebounce from '@/src/helpers/hooks/useCustomDebounce';
import {PLACEHOLDER_IMAGE} from '@/src/consts/routes';
import {getCookie} from 'cookies-next';
import {LoadingOutlined} from '@ant-design/icons';

interface MyMessagesProps {
  chatId: string | undefined;
}

const MyMessages: FC<MyMessagesProps> = ({chatId}) => {
  const [socket, setSocket] = useState<Socket>();
  const [loading, setLoading] = useState(true);
  const [enemyUser, setEnemyUser] = useState<IUser>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const chatContainer = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [debouncedValue, isDebouncing] = useCustomDebounce(
    inputValue,
    1000
  );

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
    const newSocket = io(
      `${process.env.WEBSOCKET_PROTOCOL}://${process.env.APP_BASE_URL}/chats`,
      {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${getCookie('accessToken')}`
            }
          }
        }
      }
    );
    setSocket(newSocket);
    return () => {
      if (socket) socket.close();
    };
  }, []);

  useEffect(() => {
    if (messagesList && chatId) {
      setMessages(messagesList);
    }
  }, [isMessagedSuccessfullyLoaded]);

  useEffect(() => {
    if (socket && chatId && inputValue.length !== 0) {
      socket.emit('handleTyping', {chatId: chatId, typing: isDebouncing});
    }
  }, [chatId, socket, isDebouncing]);

  useEffect(() => {
    if (socket && chatId) {
      socket.emit('joinChatById', {chatId: chatId});
    }
  }, [socket, chatId]);

  useEffect(() => {
    if (socket && chatId) {
      socket.on('errorEvent', (data: string) => {
        message.error(`WS: ${data}`);
      });
      socket.on(
        'roomJoined',
        (data: {chatId: number; members: IUser[]}) => {
          setLoading(false);
          setEnemyUser(data.members.find((e) => e.id !== user.id));
        }
      );
      socket.on('newMessage', (data: IMessage) => {
        setMessages((prev) => [...prev, data]);
      });
      socket.on(
        'userTyping',
        (data: {userId: number; typing: boolean}) => {
          if (data.userId === enemyUser?.id) {
            setTyping(data.typing);
          }
        }
      );
    }
    return () => {
      socket?.off('errorEvent');
      socket?.off('roomJoined');
      socket?.off('newMessage');
      socket?.off('userTyping');
    };
  }, [socket, enemyUser]);

  const sendMessage = useCallback(async () => {
    if (socket) {
      socket.emit('handleTyping', {chatId: chatId, typing: false});
      socket.emit('sendMessage', {chatId: chatId, message: inputValue});
      await queryClient.invalidateQueries(['chatList']);
      setInputValue('');
    }
  }, [chatId, socket, inputValue]);

  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {chatId && (
        <>
          <div className={s.chatPanel}>
            <Avatar
              src={
                enemyUser?.avatar ? enemyUser.avatar : PLACEHOLDER_IMAGE
              }
            />
            <span>
              Чат с пользователем <strong>{enemyUser?.firstName}</strong>
            </span>
            {loading && <LoadingOutlined className={s.loadingIcon} />}
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
                      avatar={e.avatar ? e.avatar : PLACEHOLDER_IMAGE}
                      name={e.name}
                      userId={e.userId}
                      time={e.createdAt}
                    />
                  ))}
                {typing && enemyUser && (
                  <ChatMessage
                    message={'...'}
                    isEnemyMessage={true}
                    avatar={
                      enemyUser.avatar
                        ? enemyUser.avatar
                        : PLACEHOLDER_IMAGE
                    }
                    name={enemyUser.lastName}
                    userId={enemyUser.id}
                  />
                )}
              </ul>
            </div>
          </div>
          <Form
            className={s.sendButton}
            onFinish={sendMessage}
            disabled={loading}
          >
            <Input
              placeholder={'Напишите сообщение и нажмите Enter'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              size={'large'}
            />
            <Button type={'primary'} htmlType={'submit'} size={'large'}>
              Отправить
            </Button>
          </Form>
        </>
      )}
    </>
  );
};

export default memo(MyMessages);
