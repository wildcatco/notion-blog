import { atom } from 'recoil';

export const queryState = atom<string>({
  key: 'queryState',
  default: '',
});
