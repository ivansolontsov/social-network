import React from 'react'
import s from './SocialPostCard.module.scss';
import { ISocialPost } from '../type';

type Props = {
    data: ISocialPost
}

const SocialPostCard = ({ data }: Props) => {
    return (
        <article className={s.socialPostCard}>
            <h1>{data.postTitle}</h1>
            <p>{data.postText}</p>
        </article>
    )
}

export default SocialPostCard