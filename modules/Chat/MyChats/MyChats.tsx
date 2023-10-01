'use client';

import s from './MyChats.module.scss';
import {type FC, memo, useCallback, useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getUserChatsFetcher} from '@/modules/Chat/api';
import ChatsItemList from '@/components/ui/ChatsItemList/ChatsItemList';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import MyMessages from '@/modules/Chat/MyMessages/MyMessages';
import dayjs from 'dayjs';

interface MyChatsProps {
  children?: React.ReactNode;
}

const MyChats: FC<MyChatsProps> = ({children}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams()!;
  const {data, isLoading} = useQuery(['chatList'], getUserChatsFetcher, {
    refetchOnMount: false
  });
  const [chatId, setChatId] = useState<undefined | string>();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    setChatId(searchParams.get('chat')?.toString());
  }, [searchParams]);

  return (
    <div className={s.myChats}>
      <ul className={s.chatList}>
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
              onClick={() =>
                router.push(
                  pathName +
                    '?' +
                    createQueryString('chat', e.chat.id.toString())
                )
              }
            />
          ))}
      </ul>
      <MyMessages chatId={chatId} />
    </div>
  );
};

export default memo(MyChats);
