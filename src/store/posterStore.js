import { create } from 'zustand';

const usePostersStore = create((set, get) => ({
  //server: import.meta.env.VITE_APP_API_URL,
     server: 'https://art-school-backend.vercel.app/api/v1/',

  getPosters: async () => {
    const response = await fetch(`${get().server}/posters`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
}));

export default usePostersStore;
