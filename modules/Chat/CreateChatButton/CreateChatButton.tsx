'use client';

import s from './CreateChatButton.module.scss';
import {type FC, memo} from 'react';
import {Button, message} from 'antd';
import {useMutation} from '@tanstack/react-query';
import {createChatWithUserFetcher} from '@/modules/Chat/api';
import {useRouter} from 'next/navigation';
import {CHATS_PAGE} from '@/src/consts/routes';
import {MessageOutlined} from '@ant-design/icons';

interface CreateChatButtonProps {
  userId: number;
}

const CreateChatButton: FC<CreateChatButtonProps> = ({userId}) => {
  const router = useRouter();
  const {mutateAsync: createChatTrigger, isLoading} = useMutation(
    createChatWithUserFetcher
  );

  const onCreateChat = async () => {
    try {
      const res = await createChatTrigger({userId});
      router.push(CHATS_PAGE + '/' + `?chat=${res.chatId}`);
    } catch (e) {
      message.error('Ошибка');
    }
  };

  return (
    <Button
      icon={<MessageOutlined />}
      ghost
      type={'link'}
      loading={isLoading}
      onClick={onCreateChat}
    >
      Отправить сообщение
    </Button>
  );
};

export default memo(CreateChatButton);
