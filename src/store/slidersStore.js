import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useSlidersStore = create((set, get) => ({
  loading: false,
  slides: [],

  getSlides: async () => {
    try {
      set(() => {
        return {
          loading: true,
        };
      });
      const response = await axios.get(`/slider_main`);
      set(() => {
        return {
          slides: response.data,
        };
      });
      set(() => {
        return {
          loading: false,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  addSlide: async data => {
    if (isDataValid(data)) {
      try {
        const response = await axios.post('/slider_main', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response;
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  editSlide: async (id, data) => {
    if (isDataValid(data)) {
      try {
        const response = await axios.put(`/slider_main/${id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response;
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  deleteSlide: async id => {
    const response = await axios.delete(`/slider_main/${id}`);
    set(() => {
      return {
        slides: get().slides.filter(slide => slide.id !== id),
      };
    });
    return response;
  },
}));

export default useSlidersStore;
