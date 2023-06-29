'use client'

import React from 'react'
import s from './Header.module.scss'
import { Avatar } from 'antd'

type Props = {}

const Header = (props: Props) => {
    return (
        <header className={s.header}>
            <div className={s.headerContainer}>
                <div className={s.logo}>
                    <Avatar size={30} />
                    <h1>ivansolontsov</h1>
                </div>
            </div>
        </header>
    )
}

export default Header