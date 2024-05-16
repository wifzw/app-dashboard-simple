import axios, { InternalAxiosRequestConfig } from 'axios';
import store from '@/store';
import { mutationTypes } from '@/modules/authentication/store/mutations/mutation-types';
import { RootStateKeys } from '@/store/types';

const resetAccount = () => {
  store.commit(
    `${RootStateKeys.AUTHENTICATION}/${mutationTypes.LOGOUT}`,
    undefined,
    { root: true },
  );
};

const Http = axios.create({
  baseURL: process.env.VUE_APP_API,
});

Http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { isAuthenticated, token } = store.state.Authentication;

  if (!isAuthenticated && token.access_token) {
    resetAccount();
  }

  if (isAuthenticated && token.access_token) {
    config.headers.Authorization = `${token.type} ${token.access_token}`;
  }

  return config;
});

export default Http;
