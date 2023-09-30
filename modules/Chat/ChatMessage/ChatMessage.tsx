import s from './ChatMessage.module.scss';
import {type FC, memo} from 'react';
import clsx from 'clsx';
import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import {BubbleTipIcon} from '@/components/ui/icons/BubbleTipIcon';
import {PLACEHOLDER_IMAGE} from '@/src/consts/routes';

interface ChatMessageProps {
  isEnemyMessage?: boolean;
  message: string;
  avatar: string;
  isOnline?: boolean;
  name: string;
  time: string;
  userId: number;
}

const ChatMessage: FC<ChatMessageProps> = ({
  isEnemyMessage = false,
  message,
  avatar,
  userId,
  name,
  time,
  isOnline
}) => {
  return (
    <li
      className={clsx([s.chatMessage], {
        [s.enemyChatMessage]: isEnemyMessage,
        [s.userChatMessage]: !isEnemyMessage
      })}
    >
      <PreloaderImage
        className={s.userChatAvatar}
        src={avatar ? avatar : PLACEHOLDER_IMAGE}
        alt={'user avatar'}
      />

      <span className={s.chatMessageBubble}>
        <BubbleTipIcon className={s.messageCorner} />
        {message}
      </span>
    </li>
  );
};

export default memo(ChatMessage);
