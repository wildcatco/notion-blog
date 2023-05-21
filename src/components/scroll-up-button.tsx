'use client';

import { IoMdArrowRoundUp } from 'react-icons/io';

import useScroll from '@/hooks/use-scroll';
import { isTouchDevice } from '@/utils/is-touch-device';

export default function ScrollUpButton() {
  const { show, buttonRef } = useScroll();

  return (
    <button
      ref={buttonRef}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-500 text-2xl text-white opacity-70 transition-all duration-300 md:bottom-20 md:right-20 md:h-14 md:w-14 md:text-3xl ${
        !show && 'hidden'
      } ${!isTouchDevice() && 'hover:scale-110 hover:opacity-100'}`}
    >
      <IoMdArrowRoundUp />
    </button>
  );
}
