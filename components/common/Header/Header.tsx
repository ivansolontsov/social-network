'use client'

import React from 'react'
import s from './Header.module.scss'
import { Avatar } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
    return (
        <header className={s.header}>
            <div className={s.headerContainer}>
                <div className={s.logo}>
                    <Avatar src='/images/icon.webp' size={30} />
                    <h1>@social</h1>
                </div>
                <nav className={s.headerLinksList}>
                    <Link href={"https://github.com/ivansolontsov/social-network"} target='_blank'>
                        <GithubOutlined /> <strong>GitGub</strong>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header