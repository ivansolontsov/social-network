'use client'

import React from 'react'
import s from './SocialPostCard.module.scss';
import { ISocialPost } from '../type';
import { Avatar } from 'antd';

type Props = {
    data: ISocialPost
}

export const SocialPostCard: React.FC<Props> = ({ data }) => {
    return (
        <article className={s.socialPostCard}>
            <div className={s.socialPostCardHead}>
                <Avatar size={50} />
                <div className={s.socialPostCardHeadTitle}>
                    <h3>{data.author.firstName} {data.author.lastName}</h3>
                    <data>{data.postCreatedDate}</data>
                </div>
            </div>
            <h3>{data.postTitle}</h3>
            <p>{data.postText}</p>
            <data>{data.postCreatedDate}, {data.author.firstName} {data.author.lastName}</data>
        </article>
    )
}