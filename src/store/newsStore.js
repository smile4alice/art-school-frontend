import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useNewsStore = create((set, get) => ({
  news: [],
  post: {},

  getNews: async () => {
    try {
      const response = await axios.get(`/news`);
      set(() => {
        return {
          news: response.data.items,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  getOnePost: async id => {
    try {
      const response = await axios.get(`/news/${id}`);
      set(() => {
        return {
          post: response.data,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  addPost: async data => {
    if (isDataValid(data)) {
      try {
        const response = await axios.post('/news', data, {
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

  editPost: async (id, data) => {
    if (isDataValid(data)) {
      try {
        const response = await axios.patch(`/news/${id}`, data, {
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

  deletePost: async id => {
    const response = await axios.delete(`/news/${id}`);
    set(() => {
      return {
        news: get().news.filter(post => post.id !== id),
      };
    });
    return response;
  },
}));

export default useNewsStore;
