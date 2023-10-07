import s from './ChatMessage.module.scss';
import {DetailedHTMLProps, type FC, LiHTMLAttributes, memo} from 'react';
import clsx from 'clsx';
import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import {BubbleTipIcon} from '@/components/ui/icons/BubbleTipIcon';
import {PLACEHOLDER_IMAGE, USER_PAGE} from '@/src/consts/routes';
import Link from 'next/link';

interface ChatMessageProps {
  isEnemyMessage?: boolean;
  message: string;
  avatar: string;
  isOnline?: boolean;
  name: string;
  time?: string;
  userId: number;
}

const ChatMessage: FC<
  ChatMessageProps &
    DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
> = ({
  isEnemyMessage = false,
  message,
  avatar,
  userId,
  name,
  time,
  isOnline,
  ...attributes
}) => {
  return (
    <li
      className={clsx([s.chatMessage], {
        [s.enemyChatMessage]: isEnemyMessage,
        [s.userChatMessage]: !isEnemyMessage
      })}
      {...attributes}
    >
      <Link href={USER_PAGE + '/' + userId}>
        <PreloaderImage
          className={s.userChatAvatar}
          src={avatar ? avatar : PLACEHOLDER_IMAGE}
          alt={name}
        />
      </Link>
      <span className={s.chatMessageBubble}>
        <BubbleTipIcon className={s.messageCorner} />
        {message}
      </span>
    </li>
  );
};

export default memo(ChatMessage);
