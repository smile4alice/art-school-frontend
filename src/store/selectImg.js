import { create } from 'zustand';

export const useActiveImg = create(set => ({
  activeImg: {},
  setActiveImg: data => {
    set(() => {
      return {
        activeImg: data,
      };
    });
  },
}));
