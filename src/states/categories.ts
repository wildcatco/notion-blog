import { atom } from 'recoil';

export const categoriesState = atom<{ selected: string[]; active: string[] }>({
  key: 'categoriesState',
  default: {
    selected: [],
    active: [],
  },
});
