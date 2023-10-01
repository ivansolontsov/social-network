import {getCookie} from 'cookies-next';
import {$api} from '@/src/axios/axios';

export const signInFetcher = async ({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<{accessToken: string}> => {
  const {data} = await $api.post(`/identity/signin`, {
    email: email,
    password: password
  });
  return data;
};

export const signUpFetcher = async ({
  email,
  password,
  firstName,
  lastName
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const {data} = await $api.post(`/identity/signup`, {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  });
  return data;
};

export const testAuthFetcher = async (
  token?: string
): Promise<boolean> => {
  const accessToken = getCookie('accessToken');
  const response = await fetch(
    `http://${process.env.APP_BASE_URL}/identity/TestAuth`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ? token : accessToken}`
      },
      cache: 'no-cache'
    }
  );
  if (!response.ok) {
    return false;
  }
  return true;
};
