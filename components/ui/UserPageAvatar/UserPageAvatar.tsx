import React, {useEffect, useState} from 'react';
import s from './UserPageAvatar.module.scss';
import {IUser} from '@/modules/User/type';
import {
  Avatar,
  Button,
  Popover,
  Skeleton,
  Upload,
  UploadProps,
  message
} from 'antd';
import PreloaderImage from '@/components/PreloaderImage/PreloaderImage';
import {PictureOutlined} from '@ant-design/icons';
import {getBase64} from '@/src/helpers/getBase64';
import {useUsersStore} from '@/modules/User/store';
import {useMutation} from '@tanstack/react-query';
import {updateUserAvatarFetcher} from '@/modules/User/api';
import Modal from '../Modal/Modal';

type Props = {
  isLoading: boolean;
  user: IUser | undefined;
};

const UserPageAvatar = ({user, isLoading}: Props) => {
  const {user: currentUser, setUser} = useUsersStore((store) => store);

  const {
    mutateAsync: updateAvatar,
    isLoading: isAvatarUpdating,
    isSuccess: isAvatarUpdated
  } = useMutation(updateUserAvatarFetcher);

  const [avatarInfo, setAvatarInfo] = useState<{
    url: string;
    firstName: string;
    lastName: string;
  }>();
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [openPreview, setOpenPreview] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setAvatarInfo({
        firstName:
          user.id === currentUser.id
            ? currentUser.firstName
            : user?.firstName,
        lastName:
          user.id === currentUser.id
            ? currentUser.lastName
            : user?.lastName,
        url: user.id === currentUser.id ? currentUser.avatar : user?.avatar
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
              await updateAvatar(formData);
              getBase64(info.file.originFileObj, (url) => {
                setUser({...currentUser, avatar: url});
                setAvatarInfo({
                  url: url,
                  firstName: currentUser.firstName,
                  lastName: currentUser.lastName
                });
                message.success(`Аватар обновлен`);
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

  // functions
  const openImagePreview = (image: string) => {
    setOpenPreview(true);
  };

  const avatarDropdownMenu = (
    <Upload {...uploadProps}>
      <Button ghost icon={<PictureOutlined />}>
        Изменить аватар
      </Button>
    </Upload>
  );

  const avatar = (
    <>
      {isLoading || isImageLoading || isAvatarUpdating ? (
        <Skeleton.Avatar active={true} size={100} />
      ) : avatarInfo?.url ? (
        <PreloaderImage
          className={s.userPageAvatar}
          src={avatarInfo.url}
          alt={avatarInfo.firstName + ' ' + avatarInfo.lastName}
          onClick={() => {
            openImagePreview(avatarInfo.url);
          }}
          objectFit='cover'
        />
      ) : (
        <Avatar size={90} />
      )}
    </>
  );

  return (
    <>
      {user && user.id === currentUser.id ? (
        <Popover
          content={avatarDropdownMenu}
          trigger='hover'
          placement='bottomLeft'
        >
          {avatar}
        </Popover>
      ) : (
        avatar
      )}
      <Modal open={openPreview} setOpen={setOpenPreview}>
        {avatarInfo && (
          <PreloaderImage
            src={avatarInfo?.url}
            alt='Фотография'
            objectFit='cover'
          />
        )}
      </Modal>
    </>
  );
};

export default UserPageAvatar;
