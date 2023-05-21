'use client';

import { ChangeEvent } from 'react';

import { BsSearch } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useRecoilState } from 'recoil';

import useFocus from '@/hooks/use-focus';
import useHover from '@/hooks/use-hover';
import { queryState } from '@/states/query';

export default function SearchBar() {
  const [query, setQuery] = useRecoilState(queryState);
  const { ref: hoverRef, isHovering } = useHover<HTMLDivElement>();
  const { ref: focusRef, isFocusing } = useFocus<HTMLInputElement>();

  const handleInputClear = () => {
    setQuery('');
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div
      ref={hoverRef}
      className="relative mx-auto w-[80%] max-w-[24rem] md:mx-0"
    >
      <BsSearch className=" absolute left-6 flex h-full items-center text-xl text-gray-400" />
      {query && (isHovering || isFocusing) && (
        <IoMdClose
          onClick={handleInputClear}
          className="absolute right-6 flex h-full items-center text-xl"
        />
      )}
      <input
        ref={focusRef}
        type="text"
        placeholder="Search posts"
        onChange={handleInputChange}
        value={query}
        className={`w-full rounded-full border-[2px] border-gray-300 py-4 pl-14 pr-12 text-xl font-medium hover:border-red-500 focus:border-red-500 focus:bg-customGray-base focus:outline-none dark:border-gray-400 dark:bg-customGray-dark dark:focus:bg-customGray-light ${
          isHovering && 'border-red-500'
        }`}
      />
    </div>
  );
}
