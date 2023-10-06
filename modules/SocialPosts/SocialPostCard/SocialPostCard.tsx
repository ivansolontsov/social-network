'use client';

import React, {useState} from 'react';
import s from './SocialPostCard.module.scss';
import {ISocialPost} from '../type';
import {Avatar, Button} from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import {USER_PAGE} from '@/src/consts/routes';
import ButtonGroup from 'antd/es/button/button-group';
import {HeartFilled} from '@ant-design/icons';
import {useMutation} from '@tanstack/react-query';
import {likePostFetcher, unlikePostFetcher} from '../api';
import clsx from 'clsx';

type Props = {
  data: ISocialPost;
};

export const SocialPostCard: React.FC<Props> = ({data}) => {
  const {mutateAsync: likeTrigger, isLoading: isLiking} =
    useMutation(likePostFetcher);
  const {mutateAsync: unlikeTrigger, isLoading: isUnliking} =
    useMutation(unlikePostFetcher);
  const [isLiked, setIsLiked] = useState<boolean>(data.isLiked);
  const [likesCount, setLikesCount] = useState<number>(data.likes);

  const handleLike = async () => {
    try {
      switch (isLiked) {
        case false:
          await likeTrigger(data.id);
          setIsLiked(true);
          setLikesCount((prev) => prev + 1);
          break;
        case true:
          await unlikeTrigger(data.id);
          setIsLiked(false);
          setLikesCount((prev) => prev - 1);
          break;
        default:
          break;
      }
    } catch (e) {}
  };

  console.log(data);
  return (
    <article className={s.socialPostCard}>
      <div className={s.socialPostCardHead}>
        <Link href={USER_PAGE + '/' + data.author.id}>
          <Avatar size={50} src={decodeURI(data.author.avatar)} />
        </Link>
        <div className={s.socialPostCardHeadTitle}>
          <Link href={USER_PAGE + '/' + data.author.id}>
            {data.author.name}
          </Link>
          <data>
            {dayjs(data.postCreatedDate)
              .locale('ru')
              .format('DD MMMM YYYY H:mm')}
          </data>
        </div>
      </div>
      <p>{data.text}</p>

      <div className={s.socialPostCardBottom}>
        <ButtonGroup className={s.socialPostActions}>
          {/* <Button type='link' icon={<CommentOutlined />} /> */}
          {/* <Button type='link' icon={<RollbackOutlined />} /> */}
          <Button
            type='link'
            onClick={handleLike}
            disabled={isLiking || isUnliking}
            loading={isLiking || isUnliking}
            icon={
              <>
                <HeartFilled className={clsx({[s.liked]: isLiked})} />{' '}
                <span className={s.likeCount}>{likesCount}</span>
              </>
            }
          />
        </ButtonGroup>
      </div>
    </article>
  );
};
