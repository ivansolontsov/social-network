'use client';

import s from './PublicProfile.module.scss';
import {type FC, memo} from 'react';
import {useParams} from 'next/navigation';
import {useUsersStore} from '@/modules/User/store';
import {useQuery} from '@tanstack/react-query';
import {getUserByIdFetcher} from '@/modules/User/api';
import {getPostsByUserIdFetcher} from '@/modules/SocialPosts/api';
import UserBackground from '@/components/ui/UserBackground/UserBackground';
import UserPageAvatar from '@/components/ui/UserPageAvatar/UserPageAvatar';
import {Skeleton} from 'antd';
import CreatePost from '@/modules/SocialPosts/CreatePost/CreatePost';
import {SocialPostsList} from '@/modules/SocialPosts/SocialPostsList/SocialPostsList';

interface PublicProfileProps {}

const PublicProfile: FC<PublicProfileProps> = ({}) => {
  const par = useParams();
  const params = {
    id: par.id.toString()
  };

  //stores
  const currentUser = useUsersStore((store) => store.user);

  // query
  const {data: user, isLoading} = useQuery([params.id + 'user'], () =>
    getUserByIdFetcher(params.id)
  );

  const {data: postsList, isLoading: isPostsLoading} = useQuery(
    [params.id + 'posts'],
    () => getPostsByUserIdFetcher(params.id)
  );

  return (
    <section className={s.userPage}>
      <div className={s.userPageHeader}>
        <UserBackground user={user} isLoading={isLoading} id={params.id} />
        <div className={s.userPageHeaderContent}>
          <UserPageAvatar isLoading={isLoading} user={user} />
          <div className={s.userPagePersonName}>
            <h1>
              <span>
                {!isLoading ? (
                  user && user.firstName
                ) : (
                  <Skeleton.Button
                    shape={'round'}
                    active={true}
                    size='small'
                  />
                )}
              </span>
              {!isLoading ? user && user.lastName : ''}
            </h1>
          </div>
        </div>
      </div>
      {Number(params.id) === currentUser.id && <CreatePost />}
      <SocialPostsList posts={postsList} isLoading={isPostsLoading} />
    </section>
  );
};

export default memo(PublicProfile);
