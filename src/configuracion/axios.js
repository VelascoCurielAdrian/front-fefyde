/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';
import { generales } from './generales';

export const STORAGE = 'token';

const axiosInstance = axios.create({
  baseURL: `${generales.baseUrldev}/api/v1`,
});

axiosInstance.interceptors.response.use(
  ({ data }) => data,
  ({ response }) => {
    let isError = false;
    let isMessage = false;
    if (response) {
      const { status, data } = response;
      if (data.handled) {
        isMessage = true;
      }
      if (status !== 404 && status !== 403) isError = true;
    } else {
      isError = true;
      isMessage = false;
    }

    return Promise.reject({ ...response, isError, isMessage });
  },
);

export const setTokenHeader = (token) => {
  axiosInstance.defaults.headers.common.Authorization = token;
};

const user = JSON.parse(localStorage.getItem(STORAGE) || sessionStorage.getItem(STORAGE) || '{}');

setTokenHeader(user.token || '');

export default axiosInstance;
