import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MenuCmp from '../../components/Menu.component';
import { authReset } from '../../store/authReducer';
import { localStoreClearLoginInfo } from '../../store/localstore';

const Home = () => {
  const dispatch = useDispatch();

  const [setting, setSetting] = useState({
    isOpen: false,
    listSetting: [
      {
        name: 'Logout',
        onClick: () => {
          localStoreClearLoginInfo();
          dispatch(authReset());
        },
      },
    ],
  });

  return (
    <div className="relative p-2 responsive-small-phone">
      <div className="flex flex-row justify-end">
        <i
          className="absolute bi bi-gear p-[9px] text-2xl hover:scale-[1.3]
                hover:cursor-pointer"
          onClick={() => setSetting({ ...setting, isOpen: !setting.isOpen })}
        ></i>
      </div>

      <MenuCmp
        listMenu={setting.listSetting}
        closeMenu={() => setSetting({ ...setting, isOpen: false })}
        toggleMenu={setting.isOpen}
      />
    </div>
  );
};

export default Home;
