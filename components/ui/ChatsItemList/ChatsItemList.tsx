import s from './ChatsItemList.module.scss';
import {type FC, memo} from 'react';
import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import {ButtonProps} from 'antd';
import clsx from 'clsx';
import {PLACEHOLDER_IMAGE} from '@/src/consts/routes';

interface ChatsItemListProps {
  active?: boolean;
  avatar: string | undefined;
  name: string;
  date: string;
}

const ChatsItemList: FC<ChatsItemListProps & ButtonProps> = ({
  avatar,
  name,
  date,
  active,
  ...attributes
}) => {
  return (
    <li
      className={clsx([s.chatListItem], {
        [s.active]: active
      })}
      {...attributes}
    >
      <PreloaderImage
        className={s.chatListAvatar}
        src={avatar ? avatar : PLACEHOLDER_IMAGE}
        alt={name}
      />
      <div className={s.chatListInfo}>
        <h3>{name}</h3>
        <span>{date}</span>
      </div>
    </li>
  );
};

export default memo(ChatsItemList);
