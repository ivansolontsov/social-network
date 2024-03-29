'use client';

import React, {FC} from 'react';
import s from './SocialPostsList.module.scss';
import {SocialPostCard} from '../SocialPostCard/SocialPostCard';
import {Skeleton} from 'antd';
import {ISocialPost} from '../type';

type Props = {
  isLoading: boolean;
  posts: ISocialPost[] | undefined;
};

export const SocialPostsList: FC<Props> = ({isLoading, posts}) => {
  console.log(posts);
  return (
    <div className={s.socialPostsList}>
      {isLoading ? (
        <Skeleton active={true} avatar={true} />
      ) : (
        posts && (
          <>
            {posts.map((post) => (
              <SocialPostCard data={post} key={post.id} />
            ))}
          </>
        )
      )}
    </div>
  );
};
