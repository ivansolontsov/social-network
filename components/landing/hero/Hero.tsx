'use client'

import React from 'react'
import s from './Hero.module.scss'
import Spline from '@splinetool/react-spline'
import { Button, Form } from 'antd'
import Link from 'next/link'
import { AUTH_ROUTE, REGISTER_ROUTE } from '@/src/consts/routes'

type Props = {}

const Hero = (props: Props) => {
    return (
        <section className={s.hero}>
            <div className={s.heroText}>
                <h1>Social Network</h1>
                <p>This is an a social network PET-project that help developers to learn new techonlogies.</p>
            </div>
            <div className={s.buttonGroup}>

                <Button type='default' size='large' block={true}><Link href={AUTH_ROUTE}>Sign In</Link></Button>
                <Button type='primary' size='large' block={true}><Link href={REGISTER_ROUTE}>Sign Up</Link></Button>
            </div>
            {/* <Spline className={s.splineModel} scene="https://prod.spline.design/RgYDLZ42E0PTX-ZD/scene.splinecode" /> */}
        </section>
    )
}

export default Hero