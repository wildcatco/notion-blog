'use client';

import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <RecoilRoot>{children}</RecoilRoot>
    </ThemeProvider>
  );
}
