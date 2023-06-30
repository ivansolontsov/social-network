'use client'

import React from 'react'
import s from './SocialPostCard.module.scss';
import { ISocialPost } from '../type';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { USER_PAGE } from '@/src/consts/routes';

type Props = {
    data: ISocialPost
}

export const SocialPostCard: React.FC<Props> = ({ data }) => {
    return (
        <article className={s.socialPostCard}>
            <div className={s.socialPostCardHead}>
                <Link href={USER_PAGE + '/' + data.author.id}>
                    <Avatar size={50} src={data.author.avatar} />
                </Link>
                <div className={s.socialPostCardHeadTitle}>
                    <Link href={USER_PAGE + '/' + data.author.id}>{data.author.name}</Link>
                    <data>{dayjs(data.postCreatedDate).locale('ru').format('DD MMMM YYYY H:mm')}</data>
                </div>
            </div>
            <p>{data.text}</p>

            <data>{dayjs(data.postCreatedDate).locale('ru').format('DD MMMM YYYY')}, <strong>{data.author.name}</strong></data>
        </article >
    )
}