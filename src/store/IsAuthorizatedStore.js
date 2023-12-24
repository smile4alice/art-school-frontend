import { create } from 'zustand';

export const useAuthorizated = create(set => ({
  IsAuthorizated: false,
  setIsAuthorizated: () => set({ IsAuthorizated: true }),
  setUnAuthorizated: () => set({ IsAuthorizated: false }),
}));
