import { create } from 'zustand';
import axios from '@/utils/axios';

const useGalleryStore = create(set => ({
  loading: false,
  images: [],
  media: {},
  error: {},

  getAllImages: async () => {
    try {
      set(() => {
        return {
          loading: true,
        };
      });
      const response = await axios.get(`/gallery/photo`);
      set(() => {
        return {
          images: response.data.items,
        };
      });
      set(() => {
        return {
          loading: false,
        };
      });
    } catch (error) {
      set(() => {
        return {
          loading: false,
          error: error,
        };
      });
      throw new Error(error);
    }
  },
}));

export default useGalleryStore;
