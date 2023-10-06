'use client';

import {Button, Form, Input, message} from 'antd';
import React from 'react';
import s from './SignUp.module.scss';
import {signUpFetcher} from '../Api';
import {useMutation} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {AUTH_ROUTE} from '@/src/consts/routes';

const SignUp = (props: any) => {
  const [form] = Form.useForm();
  const {mutateAsync: register} = useMutation(signUpFetcher);
  const router = useRouter();
  const handleRegister = async () => {
    try {
      const res = await register(form.getFieldsValue());
      form.resetFields();
      message.success('Успешно зареган');
      router.push(AUTH_ROUTE);
    } catch (e: any) {
      message.error(e.message);
    }
  };

  return (
    <section className={s.signUp}>
      <h1>Sign Up</h1>
      <Form form={form} layout='vertical' name='register'>
        <Form.Item
          name={'email'}
          label={'email'}
          rules={[
            {
              type: 'email',
              required: true
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
              required: true
            }
          ]}
        >
          <Input.Password placeholder='password' />
        </Form.Item>
        <Form.Item
          name={'firstName'}
          label={'firstName'}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input placeholder='firstName' />
        </Form.Item>
        <Form.Item
          name={'lastName'}
          label={'lastName'}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input placeholder='lastName' />
        </Form.Item>
        <Button
          type='primary'
          htmlType={'submit'}
          block={true}
          size='large'
          onClick={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          Sign Up
        </Button>
      </Form>
    </section>
  );
};

export default SignUp;
