import process from 'process';
import {getCookie} from 'cookies-next';
import axios from 'axios';
export const $api = axios.create({
  baseURL: `${process.env.APP_PROTOCOL}://${process.env.APP_BASE_URL}/`,
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
});
$api.interceptors.request.use(
  (config) => {
    if (config.headers) {
      config.headers.Authorization = `Bearer ${getCookie('accessToken')}`;
      config.headers['Accept-Language'] = 'ru';
    }
    return config;
  },
  (err: any) => {
    console.log(err);
  }
);
