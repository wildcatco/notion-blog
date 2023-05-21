'use client';

import { useTheme } from 'next-themes';
import { BsMoon, BsMoonFill, BsSun } from 'react-icons/bs';

import useMounted from '@/hooks/use-mounted';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const iconCN = 'z-10 h-8 w-8 p-[0.4rem]';

  return (
    <div className="relative flex h-10 w-[5.5rem] cursor-pointer items-center justify-between rounded-full bg-gradient-to-br from-gray-50 to-white px-2 shadow-md shadow-gray-400 transition-all duration-500 dark:from-gray-700 dark:to-customGray-dark dark:shadow-black">
      {mounted && (
        <>
          <BsSun
            className={`${iconCN} text-white`}
            onClick={() => setTheme('light')}
          />
          {theme === 'light' ? (
            <BsMoon className={iconCN} onClick={() => setTheme('dark')} />
          ) : (
            <BsMoonFill
              className={`${iconCN} text-black`}
              onClick={() => setTheme('dark')}
            />
          )}
        </>
      )}
      <span className="absolute left-[8px] h-8 w-8 rounded-full bg-black transition-all duration-500 dark:left-auto dark:translate-x-[40px] dark:bg-white" />
    </div>
  );
}
