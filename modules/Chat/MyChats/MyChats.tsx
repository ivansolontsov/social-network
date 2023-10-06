'use client';

import s from './MyChats.module.scss';
import {type FC, memo, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getUserChatsFetcher} from '@/modules/Chat/api';
import ChatsItemList from '@/components/ui/ChatsItemList/ChatsItemList';
import MyMessages from '@/modules/Chat/MyMessages/MyMessages';
import dayjs from 'dayjs';
import {MessageOutlined} from '@ant-design/icons';

interface MyChatsProps {
  children?: React.ReactNode;
}

const MyChats: FC<MyChatsProps> = () => {
  const {data, isLoading, isSuccess} = useQuery(
    ['chatList'],
    getUserChatsFetcher
  );
  const [chatId, setChatId] = useState<undefined | string>();

  return (
    <div className={s.myChats}>
      <ul className={s.chatList}>
        {isSuccess && data?.length === 0 && (
          <div className={s.emptyChats}>
            <MessageOutlined className={s.emptyChatsIcon} />
            <span>
              У вас еще нету активных чатов, зайдите на страничку любого
              пользователя, наведите на аватар и выберите пункт меню
              "отправить сообщение"
            </span>
          </div>
        )}
        {isLoading &&
          new Array(20).fill('1').map((e, i) => (
            <div className={s.skeleton} key={i}>
              <div className={s.skeletonAvatar} />
              <div className={s.skeletonGroupFlex}>
                <span className={s.skeletonTitle} />
                <span className={s.skeletonDate} />
              </div>
            </div>
          ))}
        {!isLoading &&
          data &&
          data.map((e) => (
            <ChatsItemList
              active={Number(chatId) === e.chat.id}
              key={e.enemyUser.id}
              name={e.enemyUser.name}
              date={dayjs(e.chat.lastMessageDate)
                .locale('ru')
                .format('DD MMMM')}
              avatar={e.enemyUser.avatar}
              onClick={() => setChatId(e.chat.id.toString())}
            />
          ))}
      </ul>
      <div className={s.myMessages}>
        {chatId && <MyMessages chatId={chatId} />}
      </div>
    </div>
  );
};

export default memo(MyChats);
