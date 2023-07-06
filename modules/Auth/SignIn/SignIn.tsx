'use client'

import { Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import s from './SignIn.module.scss'
import { useMutation } from '@tanstack/react-query'
import { signInFetcher } from '../Api'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useUsersStore } from '@/modules/User/store'
import { CloseOutlined, LockOutlined, LoginOutlined, MailFilled, MailOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

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

    const handleClose = () => {
        router.push('/')
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={s.signIn}
        >
            <motion.div
                initial={{ x: -300 }}
                whileInView={{ x: 0 }}
                exit={{ x: 300 }}
                className={s.signInContainer}
            >
                <Button type='link' icon={<CloseOutlined />} className={s.signInModalCloseButton} onClick={handleClose} />
                <h1>
                    Welcome Back!
                </h1>
                <Form
                    form={form}
                    layout='vertical'
                    name='auth'
                    requiredMark={'optional'}
                    autoComplete='off'
                >
                    <Form.Item
                        name={'email'}
                        label={<span className={s.formItemLabel}>E-mail Address</span>}
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: "Please enter a valid E-Mail"
                            }
                        ]}
                    >
                        <Input prefix={<MailOutlined />} autoComplete={'off'} size='large' placeholder='example@mail.ru' />
                    </Form.Item>
                    <Form.Item
                        name={'password'}
                        label={<span className={s.formItemLabel}>Password</span>}
                        rules={[
                            {
                                required: true,
                                message: "Enter your password please"
                            }
                        ]}
                    >
                        <Input.Password autoComplete={'off'} prefix={<LockOutlined />} size='large' placeholder='password' />
                    </Form.Item>
                    <Button
                        disabled={isSuccess || loading}
                        loading={loading}
                        type='primary'
                        block={true}
                        size='large'
                        icon={<LoginOutlined />}
                        className={s.signInButton}
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin()
                        }}
                    >
                        Sign In
                    </Button>
                </Form>
            </motion.div>
        </motion.section>
    )
}

export default SignIn