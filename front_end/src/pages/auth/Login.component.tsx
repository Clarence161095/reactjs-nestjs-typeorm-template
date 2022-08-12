import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, InputForm } from '../../components/Material.component';
import { Auth, checkToken, loginEffect, selectAuth } from '../../store/authReducer';
import Register from './Register.component';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const auth: Auth = useSelector(selectAuth);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(checkToken() as any);
  }, [dispatch]);

  useEffect(() => {
    if (auth.logged) {
      navigate('/home');
    }
  }, [auth.logged, navigate]);

  const handleLogin = () => {
    if (auth.logged) {
      navigate('/home');
    }

    if (checkDisabledButton()) {
      dispatch(loginEffect(userName, password) as any);
    }
  };

  const checkValidateUser = () => {
    if (userName === '') {
      return '';
    }
    if (!/^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(userName))
      return 'Tên đăng nhập phải là email.';
    return '';
  };

  const checkValidatePassword = () => {
    if (password === '') {
      return '';
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(password))
      return 'Mật khẩu ít nhất phải có 6 ký tự và chứa ký tự in hoa.';
    return '';
  };

  const checkDisabledButton = () => {
    return (
      checkValidateUser() === '' &&
      checkValidatePassword() === '' &&
      userName !== '' &&
      password !== ''
    );
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[74vh]">
      <div
        className="flex flex-col justify-center items-center border-2 rounded-xl
          px-4 py-3 w-[95%] max-w-md bg-[#130f406d]"
      >
        {!isRegister && (
          <>
            <div className="text-[2.5rem]">Đăng nhập</div>

            <InputForm
              InputAttributes={{
                type: 'text',
                alt: 'username',
                placeholder: 'Tên đăng nhập/Email',
                value: userName,
                onKeyDown: handleKeyDown,
                onChange: (e: any) => setUserName(e.target.value),
              }}
              checkValidate={checkValidateUser}
            />

            <InputForm
              InputAttributes={{
                type: 'password',
                alt: 'password',
                placeholder: 'Mật khẩu',
                value: password,
                onKeyDown: handleKeyDown,
                onChange: (e: any) => setPassword(e.target.value),
              }}
              checkValidate={checkValidatePassword}
            />

            <div className="flex flex-row justify-center items-center my-2">
              <Button className="bg-[#27ae60]" onClick={() => setIsRegister(true)}>
                Đăng ký
              </Button>
              <Button
                className="ml-6"
                InputAttributes={{
                  disabled: !checkDisabledButton(),
                }}
                onClick={handleLogin}
              >
                Đăng nhập
              </Button>
            </div>
            <span className="w-full text-orange-400 text-center">
              {auth.errorMessage}
            </span>
          </>
        )}

        {isRegister && <Register setIsRegister={setIsRegister} />}
      </div>
    </div>
  );
}

export default Login;
