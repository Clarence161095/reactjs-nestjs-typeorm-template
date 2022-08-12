/* eslint-disable array-callback-return */
import { useCallback, useEffect, useState } from 'react';

function MenuCmp(props: any) {
  const [toggleMenu, setToggleMenu] = useState(false);

  const escFunction = useCallback(
    (event: any) => {
      if (event.key === 'Escape') {
        setToggleMenu(false);
        props.closeMenu();
      }
    },
    [props]
  );

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  useEffect(() => {
    setToggleMenu(props.toggleMenu);
  }, [props.toggleMenu]);

  const styles = {
    show: {
      backgroundColor: props?.style?.bgColor,
    },
    hidden: {
      opacity: '0.00001',
      transform: `scale(0.1) rotate(180deg) translate(${
        props?.style?.x ? props?.style?.x : -500
      }%, ${props?.style?.y ? props?.style?.y : 2000}%)`,
    },
  };

  return (
    <div className="absolute z-[10]">
      <ul
        className="fixed left-[50%] translate-x-[-50%] top-[25%]
          w-[90%] min-w-[350px] max-w-[350px]
          p-5 rounded-md bg-[#8e44ad]
          text-lg text-center list-none
          flex flex-col justify-center items-center
          transition-all duration-300"
        style={toggleMenu ? styles.show : styles.hidden}
      >
        <li
          key={'close'}
          className="flex flex-row justify-between text-2xl mb-2 w-full"
        >
          <p className="text-code text-3xl">MENU</p>
          <i
            className="bi bi-x-circle translate-y-[-20%] 
              absolute
              hover:cursor-pointer
              hover:scale-125 transition-all right-4"
            onClick={() => {
              setToggleMenu(false);
              props.closeMenu();
            }}
          ></i>
        </li>

        {props.listMenu.map((item: any) => {
          if (item.name) {
            return (
              <li
                className="border-[1px] border-solid w-full border-b-0 text-sm text-code p-1
                hover:bg-[#27ae60] hover:cursor-pointer hover:scale-105 transition-all
                last:border-[1px]
                "
                key={JSON.stringify(item)}
                onClick={() => {
                  item.onClick({ closeMenu: props.closeMenu });
                }}
              >
                {item.name}
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}

export default MenuCmp;
