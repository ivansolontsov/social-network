'use client'

import React, { useState } from 'react';
import s from './SocialPostsList.module.scss';
import SocialPostCard from '../SocialPostCard/SocialPostCard';
import { useQuery } from '@tanstack/react-query';
import { getAllPostsFetcher } from '../api';
import { Skeleton } from 'antd';
import { ISocialPost } from '../type';

type Props = {}

const SocialPostsList = async (props: Props) => {
    const { isLoading } = useQuery(['getAllPosts'],
        getAllPostsFetcher,
        {
            onSuccess: (data) => {
                console.log(data)
                setPosts(data)
            }
        })

    const [posts, setPosts] = useState<ISocialPost[]>([])

    return (
        <div className={s.socialPostsList}>
            {isLoading
                ? <Skeleton active={true} avatar={true} />
                : posts && (
                    <>
                        {posts.map((post) => (
                            <SocialPostCard data={post} />
                        ))}
                    </>
                )
            }
        </div >
    )
}

export default SocialPostsList