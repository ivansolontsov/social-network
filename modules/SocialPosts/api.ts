import {getCookie} from 'cookies-next';
import {ISocialPost} from './type';
import {$api} from '@/src/axios/axios';

export const getAllPostsFetcher = async (): Promise<ISocialPost[]> => {
  const {data} = await $api.get('/post/getAll');
  return data;
};

export const getPostsByUserIdFetcher = async (
  id: string
): Promise<ISocialPost[]> => {
  const {data} = await $api.get(`/post/getPostsByUserId/${id}`);
  return data;
};

export const createPostFetcher = async (formData: FormData) => {
  const {data} = await $api.post(`/post/createPost`, {formData});
  return data;
};

export const likePostFetcher = async (postId: number) => {
  const {data} = await $api.post(`/likes/likePost`, {postId: postId});
  return data;
};

export const unlikePostFetcher = async (postId: number) => {
  const {data} = await $api.delete(`/likes/unlikePost/${postId}`);
  return data;
};
