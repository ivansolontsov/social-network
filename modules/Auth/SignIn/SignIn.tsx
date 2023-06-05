'use client'

import { Button, Form, Input } from 'antd'
import React, { useEffect } from 'react'
import s from './SignIn.module.scss'
import { useMutation } from '@tanstack/react-query'
import { signInFetcher } from '../Api'


type Props = {}

const SignIn = (props: Props) => {
    const { mutateAsync: login } = useMutation(signInFetcher);

    return (
        <section className={s.signIn}>
            <h1>
                Sign In
            </h1>
            <Form
                layout='vertical'
                name='auth'
                onFinish={(values: { email: string, password: string }) => {
                    login({ ...values })
                }}
            >
                <Form.Item
                    name={'email'}
                    label={'email'}
                    rules={[
                        {
                            type: 'email',
                            required: true,
                        }
                    ]}
                >
                    <Input placeholder='example@mail.ru' />
                </Form.Item>
                <Form.Item
                    name={'password'}
                    label={'password'}
                    rules={[
                        {
                            required: true,
                        }
                    ]}
                >
                    <Input.Password placeholder='password' />
                </Form.Item>
                <Button type='primary' block={true} size='large' htmlType='submit'>Sign In</Button>
            </Form>
        </section>
    )
}

export default SignIn