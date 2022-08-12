import CONSTANT from '../core/constant.core';
import util from '../core/utilities.core';
import Image from '../pages/common/Image.component';

export const LoadingCmp = () => {
  return (
    <div
      className="fixed top-0 left-0 overflow-hidden min-w-[100vw] max-w-[100]
        min-h-screen max-h-screen w-screen h-screen flex flex-row justify-center 
        items-center bg-[#71809355] z-[100]"
    >
      <Image
        setState={(setState: any) => {
          util.getImageFromUrl(CONSTANT.LOADING_URL, setState);
        }}
        alt="loading..."
        style={{ width: '300px', height: '300px' }}
      ></Image>
    </div>
  );
};

export const InputForm = (props: any) => {
  return (
    <>
      <input
        className={`
          input-enabled
          w-full
          text-3xl 
          text-black 
          p-3 
          rounded-md 
          border-0 
          border-transparent
          mb-2 ${props?.className}`}
        {...props?.InputAttributes}
      />
      <span
        className="w-full 
        text-orange-400 
          text-center"
      >
        {props?.checkValidate()}
      </span>
    </>
  );
};

export const Button = (props: any) => {
  return (
    <button
      {...props?.InputAttributes}
      onClick={props.onClick}
      className={`min-w-[100px] 
      text-white text-xl 
      bg-[#2980b9] 
        px-2 py-1 
        shadow 
      shadow-[#a0a3a5] 
        rounded 
        hover:shadow-[5px]
      hover:bg-[#8e44ad] 
      hover:shadow-[#c7d4d7] 
        hover:scale-105 
      disabled:bg-[#cccccc]
        disabled:cursor-not-allowed 
      disabled:text-[#666666]
        disabled:scale-100
        ${props.className}
        `}
    >
      {props?.children}
    </button>
  );
};
