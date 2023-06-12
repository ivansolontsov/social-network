'use client'

import React from 'react'
import s from './SideNavigation.module.scss'
import Link from 'next/link'
import { MessageOutlined, UserOutlined } from '@ant-design/icons'

type Props = {}

export const SideNavigation: React.FC<Props> = (props) => {
    return (
        <nav className={s.sideNavigation}>
            <Link
                className={s.sideNavigationLink}
                href={'#'}
            >
                <UserOutlined className={s.sideNavigationIcon} /> Моя Страница
            </Link>
            <Link
                className={s.sideNavigationLink}
                href={'#'}
            >
                <MessageOutlined className={s.sideNavigationIcon} /> Сообщения
            </Link>
        </nav >
    )
}

export default SideNavigation