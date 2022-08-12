import axios from 'axios';
import { toast } from 'react-toastify';

const AxiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_HOST || 'http://192.168.0.3:40011',
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => JSON.stringify(params),
});

// Add a request interceptor
AxiosClient.interceptors.request.use(
  function (config: any) {
    // Do something before request is sent
    const token = localStorage.getItem('access-token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  function (error) {
    // Do something with request error
    if (error.message) {
      toast(error.message);
    }
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.message) {
    }
    return Promise.reject(error);
  }
);

export default AxiosClient;
