import { atom } from 'recoil';

export const pageState = atom<number>({
  key: 'pageState',
  default: 1,
});
