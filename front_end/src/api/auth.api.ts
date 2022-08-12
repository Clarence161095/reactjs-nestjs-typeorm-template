import AxiosClient from './axios.client';

const path = `/v1/auth/`

const AuthApi = {
  login: async (userName: string, password: string) => {
    const url =  path + 'sign-in';
    return await AxiosClient.post(url, {
      email: userName,
      password: password,
    });
  },
  register: async (userName: string, password: string) => {
    const url =  path + 'sign-up';
    return await AxiosClient.post(url, {
      email: userName,
      password: password,
    });
  },
  getToken: async () => {
    const url = path + 'token';
    return await AxiosClient.get(url)
  }
};

export default AuthApi;
