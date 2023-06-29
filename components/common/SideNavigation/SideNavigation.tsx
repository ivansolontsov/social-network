'use client'

import React from 'react'
import s from './SideNavigation.module.scss'
import Link from 'next/link'
import { InboxOutlined, LogoutOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useUsersStore } from '@/modules/User/store'
import { useRouter } from 'next/navigation'
import { USER_PAGE } from '@/src/consts/routes'

type Props = {}

export const SideNavigation: React.FC<Props> = (props) => {
    const setAuth = useUsersStore((store) => store.setAuth)
    const user = useUsersStore((store) => store.user)
    const router = useRouter()

    return (
        <nav className={s.sideNavigation}>
            <Link
                className={s.sideNavigationLink}
                href={USER_PAGE + '/' + user.id}
            >
                <UserOutlined className={s.sideNavigationIcon} /> Моя Страница
            </Link>
            <Link
                className={s.sideNavigationLink}
                href={'/'}
            >
                <InboxOutlined className={s.sideNavigationIcon} /> Новости
            </Link>
            <Link
                className={s.sideNavigationLink}
                href={'/'}
            >
                <MessageOutlined className={s.sideNavigationIcon} /> Сообщения
            </Link>
            <Link
                href={"#"}
                className={s.sideNavigationLink}
                onClick={() => {
                    setAuth(false)
                    router.refresh()
                }}
            >
                <LogoutOutlined className={s.sideNavigationIcon} /> Выйти
            </Link>
        </nav >
    )
}

export default SideNavigation