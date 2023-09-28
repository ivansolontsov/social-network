import {IUser} from './type';
import {$api} from '@/src/axios/axios';

export const getUserFetcher = async (): Promise<IUser> => {
  const {data} = await $api.get('/users/getUser');
  return data;
};

export const getUserByIdFetcher = async (id: string): Promise<IUser> => {
  const {data} = await $api.get(`/users/getUserById/${id}`);
  return data;
};

export const updateUserBackgroundFetcher = async (formData: FormData) => {
  const {data} = await $api.post('/users/updateBackground', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};

export const updateUserAvatarFetcher = async (formData: FormData) => {
  const {data} = await $api.post('/users/updateAvatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return data;
};
