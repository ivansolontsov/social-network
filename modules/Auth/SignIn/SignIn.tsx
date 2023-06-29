'use client'

import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import s from './SignIn.module.scss'
import { useMutation } from '@tanstack/react-query'
import { signInFetcher } from '../Api'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useUsersStore } from '@/modules/User/store'

type Props = {}

const SignIn = (props: Props) => {
    const { mutateAsync: login, isLoading: loading, isSuccess } = useMutation(signInFetcher);
    const setAuth = useUsersStore((store) => store.setAuth)
    const router = useRouter()

    const [form] = Form.useForm()
    const handleLogin = async () => {
        try {
            const res = await login(form.getFieldsValue())
            form.resetFields()
            setCookie('accessToken', res.accessToken);
            setAuth(true)
            message.success('Успешно авторизирован');
            router.push('/')
            router.refresh();
        } catch (e: any) {
            message.error(e.message)
        }
    }
    return (
        <section className={s.signIn}>
            <h1>
                Sign In
            </h1>
            <Form
                form={form}
                layout='vertical'
                name='auth'
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
                <Button
                    disabled={isSuccess}
                    loading={loading}
                    type='primary'
                    block={true}
                    size='large'
                    onClick={(e) => {
                        e.preventDefault()
                        handleLogin()
                    }}>
                    Sign In
                </Button>
            </Form>
        </section>
    )
}

export default SignIn