import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig} from 'axios';
import { getAuth } from 'firebase/auth';

const axiosIncludedIdToken: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  responseType: 'json',
});

axiosIncludedIdToken.interceptors.request.use(async (request: AxiosRequestConfig) => {
  //リクエスト前に毎回idTokenを取得する
  let idToken: string|undefined = await getAuth().currentUser?.getIdToken();
  if (idToken === undefined) idToken = 'faild';
  if (request.headers === undefined) throw new Error('リクエストの作成に失敗しました');
  request.headers.Authorization = idToken;
  return request;
});

export {axiosIncludedIdToken};