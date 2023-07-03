'use client'

import React from 'react'
import s from './SocialPostCard.module.scss';
import { ISocialPost } from '../type';
import { Avatar, Button } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import { USER_PAGE } from '@/src/consts/routes';
import ButtonGroup from 'antd/es/button/button-group';
import { CommentOutlined, HeartFilled, RollbackOutlined } from '@ant-design/icons';

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

            <div className={s.socialPostCardBottom}>
                <ButtonGroup className={s.socialPostActions}>
                    <Button type='link' icon={<CommentOutlined />} />
                    <Button type='link' icon={<RollbackOutlined />} />
                    <Button type='link' icon={<><HeartFilled /> <span className={s.likeCount}>3</span></>} />
                </ButtonGroup>
            </div>
        </article >
    )
}