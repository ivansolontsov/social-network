import React, {useState} from 'react';
import s from './CreatPost.module.scss';
import {useUsersStore} from '@/modules/User/store';
import {
  Avatar,
  Button,
  Form,
  Input,
  Spin,
  Upload,
  UploadProps,
  message
} from 'antd';
import {PictureOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createPostFetcher} from '../api';

type Props = {};

const CreatePost = (props: Props) => {
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const userAvatar = useUsersStore((store) => store.user.avatar);
  const userId = useUsersStore((store) => store.user.id);

  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const {
    mutateAsync: createPost,
    isLoading: isPostCreating,
    isSuccess: isPostCreated
  } = useMutation(createPostFetcher);

  const uploadProps: UploadProps = {
    name: 'file',
    defaultFileList: [],
    showUploadList: false,
    customRequest: ({onSuccess}: any) =>
      setTimeout(() => {
        onSuccess('ok', null);
      }, 0),
    beforeUpload: (file) => {
      if (file.size / 1000000 > 5) {
        message.error(`${file.name} не должен превышать 5 мб`);
        return Upload.LIST_IGNORE;
      }
      const regex = /^.*\.(png|jpg|jpeg|webp|avif|heic)$/gm;
      if (!file.name.toLowerCase().match(regex)) {
        message.error(`${file.name} имеет не правильное расширение`);
      }
      return file.name.match(regex) ? true : Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      switch (info.file.status) {
        case 'uploading':
          setIsImageLoading(true);
          break;
        case 'done':
          if (info.file.originFileObj) {
            setIsImageLoading(false);
            message.success(`файл ${info.file.name} успешно добавлен`);
          }
          break;
        case 'error':
          setIsImageLoading(false);
          message.info(`${info.file.name} не получилось загрузить`);
          break;
        case 'removed':
          message.info(`${info.file.name} удален из загружаемых`);
          break;
      }
    }
  };

  const onFormFinish = async (formValues: {
    postText: string;
    image: any;
  }) => {
    try {
      const formData: FormData = new FormData();
      console.log(formValues);
      formData.append('content', formValues.postText);
      if (formValues.image) {
        formData.append('image', formValues.image.originFileObj);
      }
      await createPost(formData);
      await queryClient.invalidateQueries([userId + 'posts']);
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={s.createPostBlock}>
      <Form
        form={form}
        name='createPost'
        className={s.createPostForm}
        autoComplete='off'
        onFinish={onFormFinish}
        disabled={isPostCreating}
      >
        <div className={s.createPostInputWrapper}>
          <Avatar
            className={s.createPostAvatar}
            src={userAvatar ? userAvatar : ''}
            size={40}
          />
          <Form.Item
            className={s.createPostFormItem}
            name={'postText'}
            rules={[
              {
                required: true
              }
            ]}
            noStyle
          >
            <Input
              className={s.createPostInput}
              type='text'
              placeholder='Что у вас нового'
              autoComplete='off'
            />
          </Form.Item>
          <div className={s.createPostButtons}>
            <Form.Item
              rules={[
                {
                  required: false
                }
              ]}
              name={'image'}
              noStyle
            >
              <Upload {...uploadProps}>
                <Button
                  ghost
                  icon={isImageLoading ? <Spin /> : <PictureOutlined />}
                />
              </Upload>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreatePost;
