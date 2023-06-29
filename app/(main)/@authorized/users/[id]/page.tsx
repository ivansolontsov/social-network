'use client'

import PreloaderImage from '@/components/PreloaderImage/PreloaderImage'
import { useUsersStore } from '@/modules/User/store'
import s from '@/styles/pages/userPage/userPage.module.scss'
import { Skeleton } from 'antd'

export default function Page() {
    const user = useUsersStore((store) => store.user)

    return (
        <section className={s.userPage}>
            <div className={s.userPageHeader}>
                <PreloaderImage
                    className={s.userPageBackground}
                    src={user.background}
                    alt={user.firstName + ' ' + user.lastName}
                    objectFit='cover'
                />
                <div className={s.userPageHeaderContent}>
                    <PreloaderImage
                        className={s.userPageAvatar}
                        src={user.avatar}
                        alt={user.firstName + ' ' + user.lastName}
                        objectFit='cover'
                    />
                    <div className={s.userPagePersonName}>
                        <h1>
                            <span>{user.firstName}</span>
                            {user.lastName}
                        </h1>
                    </div>
                </div>
            </div>
            <div className={s.userPageBlock}>
                <Skeleton />
            </div>
        </section>
    )
}