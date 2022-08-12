import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import AuthApi from '../api/auth.api';
import { localStoreClearLoginInfo } from './localstore';

export type Auth = {
  accessToken: string;
  email: string;
  role: string;
  logged: boolean;
  error: boolean;
  isLoading: boolean;
  errorMessage: string;
};

export const INIT_AUTH_STATE = {
  accessToken: '',
  email: '',
  role: '',
  logged: false,
  isLoading: false,
  error: false,
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INIT_AUTH_STATE,
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.logged = true;
      state.isLoading = false;
    },
    loginFailure: (state, action) => {
      state.logged = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    isLoginLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    authReset: (state) => {
      state.accessToken = INIT_AUTH_STATE.accessToken;
      state.email = INIT_AUTH_STATE.email;
      state.role = INIT_AUTH_STATE.role;
      state.logged = INIT_AUTH_STATE.logged;
      state.isLoading = INIT_AUTH_STATE.isLoading;
      state.error = INIT_AUTH_STATE.error;
      state.errorMessage = INIT_AUTH_STATE.errorMessage;
    },
  },
});

export const { loginSuccess, loginFailure, isLoginLoading, authReset } =
  authSlice.actions;

export const loginEffect =
  (userName: string, password: string) => (dispatch: any) => {
    const _fetch = async () => {
      try {
        const resultLogin: any = await toast.promise(
          AuthApi.login(userName, password),
          {
            pending: 'Đang đăng nhập...⌛',
            success: 'Đăng nhập thành công 👌',
            error: 'Đăng nhập thất bại!!!! 🤯',
          },
          {
            position: 'top-center',
            autoClose: 700,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );

        if (resultLogin.data.data.attributes['access-token']) {
          localStorage.setItem(
            'access-token',
            resultLogin.data.data.attributes['access-token']
          );
          localStorage.setItem(
            'refresh-token',
            resultLogin.data.data.attributes['refresh-token']
          );

          const resultGetToken: any = await AuthApi.getToken();

          if (resultGetToken.data.data.attributes) {
            localStorage.setItem(
              'email',
              resultGetToken.data.data.attributes['email']
            );
            localStorage.setItem(
              'role',
              resultGetToken.data.data.attributes['role']
            );
            dispatch(
              loginSuccess({
                accessToken: resultLogin.data.data.attributes['access-token'],
                email: resultGetToken.data.data.attributes['email'],
                role: resultGetToken.data.data.attributes['role'],
                logged: true,
              })
            );
          }
        }
      } catch (error: any) {
        if (error.message) {
          switch (error.response.status) {
            case 304:
              dispatch(loginFailure('Server lỗi... xin vui lòng trở lại sau!'));
              break;
            default:
              dispatch(loginFailure('Sai tên đăng nhập hoặc mật khẩu!'));
              break;
          }
        }
      }
    };
    _fetch();
  };

export const checkToken = () => (dispatch: any) => {
  if (localStorage.getItem('access-token')) {
    dispatch(isLoginLoading(true));
    const _fetch = async () => {
      try {
        const resultGetToken: any = await AuthApi.getToken();

        if (resultGetToken.data.data.attributes) {
          localStorage.setItem(
            'email',
            resultGetToken.data.data.attributes['email']
          );
          localStorage.setItem('role', resultGetToken.data.data.attributes['role']);
          dispatch(
            loginSuccess({
              accessToken: localStorage.getItem('access-token'),
              email: resultGetToken.data.data.attributes['email'],
              role: resultGetToken.data.data.attributes['role'],
            })
          );
        } else {
          dispatch(authReset());
        }
      } catch (error) {
        dispatch(authReset());
        localStoreClearLoginInfo();
      }
    };
    _fetch();
  } else {
    dispatch(authReset());
    localStoreClearLoginInfo();
  }
};

export const selectAuth = (state: any) => state.auth;

export default authSlice.reducer;
