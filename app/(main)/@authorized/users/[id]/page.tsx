'use client'

import UserBackground from '@/components/ui/UserBackground/UserBackground'
import CreatePost from '@/modules/SocialPosts/CreatePost/CreatePost'
import { SocialPostsList } from '@/modules/SocialPosts/SocialPostsList/SocialPostsList'
import { getPostsByUserIdFetcher } from '@/modules/SocialPosts/api'
import { getUserByIdFetcher } from '@/modules/User/api'
import { useUsersStore } from '@/modules/User/store'
import { IUser } from '@/modules/User/type'
import s from '@/styles/pages/userPage/userPage.module.scss'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import UserPageAvatar from '@/components/ui/UserPageAvatar/UserPageAvatar'

export default function Page({ params }: { params: { id: string } }) {
    //stores
    const currentUser = useUsersStore((store) => store.user);

    // query
    const { data: user, isLoading, isSuccess } =
        useQuery(
            ['getUserById'],
            () => getUserByIdFetcher(params.id),
            {
                enabled: true
            }
        )

    const { data: postsList, isLoading: isPostsLoading } =
        useQuery(
            ['getPostsByUserId'],
            () => getPostsByUserIdFetcher(params.id)
        )

    return (
        <section className={s.userPage}>
            <div className={s.userPageHeader}>
                <UserBackground
                    user={user}
                    isLoading={isLoading}
                    id={params.id}
                />
                <div className={s.userPageHeaderContent}>
                    <UserPageAvatar
                        isLoading={isLoading}
                        user={user}
                    />
                    <div className={s.userPagePersonName}>
                        <h1>
                            <span>
                                {!isLoading
                                    ? user && user.firstName
                                    : <Skeleton.Button shape={'round'} active={true} size='small' />}
                            </span>
                            {!isLoading ? user && user.lastName : ''}
                        </h1>
                    </div>
                </div>
            </div>
            {Number(params.id) === currentUser.id && (
                <CreatePost />
            )}
            <SocialPostsList posts={postsList} isLoading={isPostsLoading} />
        </section>
    )
}