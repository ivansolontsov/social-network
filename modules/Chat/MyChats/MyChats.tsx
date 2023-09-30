'use client';

import s from './MyChats.module.scss';
import {type FC, memo} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getUserChatsFetcher} from '@/modules/Chat/api';
import ChatsItemList from '@/components/ui/ChatsItemList/ChatsItemList';
import {useParams, useRouter} from 'next/navigation';
import * as querystring from 'querystring';
import {CHATS_PAGE} from '@/src/consts/routes';
import MyMessages from '@/modules/Chat/MyMessages/MyMessages';
import dayjs from 'dayjs';

interface MyChatsProps {
  children?: React.ReactNode;
}

const MyChats: FC<MyChatsProps> = ({children}) => {
  const router = useRouter();
  const params = useParams();
  const {data, isLoading} = useQuery(['chatList'], getUserChatsFetcher);
  return (
    <div className={s.myChats}>
      <ul className={s.chatList}>
        {!isLoading &&
          data &&
          data.map((e) => (
            <ChatsItemList
              active={Number(params.chatId) === e.chat.id}
              key={e.enemyUser.id}
              name={e.enemyUser.name}
              date={dayjs(e.chat.lastMessageDate)
                .locale('ru')
                .format('DD MMMM')}
              avatar={e.enemyUser.avatar}
              onClick={() => router.push(CHATS_PAGE + '/' + e.chat.id)}
            />
          ))}
      </ul>
      <MyMessages />
    </div>
  );
};

export default memo(MyChats);
