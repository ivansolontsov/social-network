"use client";

import React, { FC, useState } from 'react';
import s from './SocialPostsList.module.scss';
import { SocialPostCard } from '../SocialPostCard/SocialPostCard';
import { useQuery } from '@tanstack/react-query';
import { getAllPostsFetcher } from '../api';
import { Skeleton } from 'antd';
import { ISocialPost } from '../type';

type Props = {
    isLoading: boolean,
    posts: ISocialPost[] | undefined
}

export const SocialPostsList: FC<Props> = ({ isLoading, posts }) => {
    return (
        <div className={s.socialPostsList}>
            {isLoading
                ? <Skeleton active={true} avatar={true} />
                : posts && (
                    <>
                        {posts.map((post, index) => (
                            <SocialPostCard data={post} key={index} />
                        ))}
                    </>
                )
            }
        </div >
    )
};