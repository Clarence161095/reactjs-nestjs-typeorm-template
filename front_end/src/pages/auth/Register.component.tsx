import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AuthApi from '../../api/auth.api';
import { Button, InputForm } from '../../components/Material.component';

function Register(props: any) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registerStatus, setRegisterStatus] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('userName')) {
      setRegisterStatus(true);
    }
    setErrorMessage('');
  }, []);

  const handleRegister = () => {
    if (checkDisabledButton()) {
      const _fetch = async () => {
        try {
          const resultRegister: any = await toast.promise(
            AuthApi.register(userName, password),
            {
              pending: 'Đang kiểm tra đăng ký...⌛',
              success: 'Đăng ký thành công thành công 👌',
              error: 'Đăng ký thất bại!!!! 🤯',
            }
          );

          if (resultRegister.data.data.attributes['email'] === userName) {
            localStorage.setItem('userName', userName);
            setRegisterStatus(true);
          }
        } catch (error: any) {
          switch (error.response.status) {
            case 304:
              setErrorMessage('Server lỗi... xin vui lòng trở lại sau!');
              break;
            default:
              setErrorMessage('Tên đăng nhập hoặc mật khẩu đã tồn tại...');
              break;
          }
        }
      };
      _fetch();
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

  const checkValidateConfirmPassword = () => {
    if (password === '') {
      return '';
    }
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/.test(password))
      return 'Mật khẩu ít nhất phải có 6 ký tự và chứa ký tự in hoa.';
    if (confirmPassword !== password) {
      return 'Mật khẩu xác nhận không giống mật khẩu ở trên...';
    }
    return '';
  };

  const checkDisabledButton = () => {
    return (
      checkValidateUser() === '' &&
      checkValidatePassword() === '' &&
      checkValidateConfirmPassword() === '' &&
      userName !== '' &&
      password !== ''
    );
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      handleRegister();
    }
  };

  return (
    <>
      <div className="text-[2.5rem]">Đăng ký</div>

      {!registerStatus && (
        <>
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

          <InputForm
            InputAttributes={{
              type: 'password',
              alt: 'confirmPassword',
              placeholder: 'Xác nhận lại mật khẩu',
              value: confirmPassword,
              onKeyDown: handleKeyDown,
              onChange: (e: any) => setConfirmPassword(e.target.value),
            }}
            checkValidate={checkValidateConfirmPassword}
          />

          <div className="flex flex-row justify-center items-center my-2">
            <Button
              className="bg-red-500 ml-4"
              onClick={() => {
                props.setIsRegister(false);
              }}
            >
              Hủy
            </Button>
            <Button
              className="bg-[#27ae60] ml-6"
              InputAttributes={{
                disabled: !checkDisabledButton(),
              }}
              onClick={handleRegister}
            >
              Đăng ký
            </Button>
          </div>
          <span className="w-full text-orange-400 text-center">{errorMessage}</span>
        </>
      )}

      {registerStatus && (
        <div className="flex flex-col items-center text-center">
          <div>Đăng ký tài khoản thành công</div>
          <div>
            Tài khoản của bạn đã đăng ký là:{' '}
            <span className="text-green-500 text-xl">
              {localStorage.getItem('userName')
                ? localStorage.getItem('userName')
                : userName}
            </span>
          </div>
          <div className="text-[#fbc531]">
            Xin vui lòng liên hệ với admin để "Mở khóa tài khoản" 👻
          </div>
          <div className="flex flex-row justify-center items-center my-2">
            <Button
              className="bg-[#95a5a6] ml-4 pt-2 hover:bg-[#ecf0f1]"
              onClick={() => {
                props.setIsRegister(false);
              }}
            >
              🔙
            </Button>
            <Button
              className="bg-[#e67e22] ml-6 py-[6px]"
              onClick={() => {
                localStorage.removeItem('userName');
                setRegisterStatus(false);
              }}
            >
              Đăng ký lại
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default Register;
