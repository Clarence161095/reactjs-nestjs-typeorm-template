import CONSTANT from '../../core/constant.core';
import util from '../../core/utilities.core';
import Image from './Image.component';

const Loading = () => {
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
        className="max-w-[220px] animate-bounce"
      ></Image>
    </div>
  );
};

export default Loading;
