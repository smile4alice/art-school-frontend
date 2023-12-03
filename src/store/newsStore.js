import { create } from 'zustand';

const useNewsStore = create((set, get) => ({
  server: import.meta.env.VITE_APP_API_URL,
  isLoading: false,

  getNews: async () => {
    const response = await fetch(`${get().server}/news`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
}));

export default useNewsStore;
