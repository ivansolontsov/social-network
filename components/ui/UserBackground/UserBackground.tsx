import React, {useEffect, useState} from 'react';
import s from './UserBackground.module.scss';
import {IUser} from '@/modules/User/type';
import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import {Button, Upload, UploadProps, message} from 'antd';
import {EditOutlined, PictureFilled} from '@ant-design/icons';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateUserBackgroundFetcher} from '@/modules/User/api';
import {useUsersStore} from '@/modules/User/store';
import {getBase64} from '@/src/helpers/getBase64';
import {PLACEHOLDER_IMAGE} from '@/src/consts/routes';

type Props = {
  user: IUser | undefined;
  isLoading: boolean;
  id: string;
};

const UserBackground = ({id, isLoading, user}: Props) => {
  const currentUser = useUsersStore((store) => store.user);
  const setUser = useUsersStore((store) => store.setUser);

  const {
    mutateAsync: updateBackground,
    isLoading: isBgUpdating,
    isSuccess: isBgUpdated
  } = useMutation(updateUserBackgroundFetcher);

  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [bgInfo, setBgInfo] = useState<{
    url: string | undefined;
    firstName: string;
    lastName: string;
  }>();

  useEffect(() => {
    if (user) {
      setBgInfo({
        firstName: user.firstName,
        lastName: user.lastName,
        url: user.background ? user.background : PLACEHOLDER_IMAGE
      });
    }
  }, [user, isLoading]);

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
    onChange: async (info) => {
      try {
        switch (info.file.status) {
          case 'uploading':
            setIsImageLoading(true);
            break;
          case 'done':
            if (info.file.originFileObj) {
              const formData = new FormData();
              formData.append('image', info.file.originFileObj);
              await updateBackground(formData);
              getBase64(info.file.originFileObj, (url) => {
                setUser({...currentUser, background: url});
                setBgInfo({
                  url: url,
                  firstName: currentUser.firstName,
                  lastName: currentUser.lastName
                });
                message.success(`Обложка обновлена`);
                setIsImageLoading(false);
              });
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
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <>
      {bgInfo?.url ? (
        <PreloaderImage
          className={s.userPageBackground}
          isLoading={isLoading || isImageLoading || isBgUpdating}
          src={bgInfo.url}
          alt={bgInfo.firstName + ' ' + bgInfo.lastName}
          objectFit='cover'
        />
      ) : (
        <div className={s.userPageBackground} />
      )}
      {Number(id) == currentUser.id && (
        <Upload {...uploadProps} className={s.userChangeBackgroundButton}>
          <Button ghost icon={<EditOutlined />}>
            Изменить обложку
          </Button>
        </Upload>
      )}
    </>
  );
};

export default UserBackground;
