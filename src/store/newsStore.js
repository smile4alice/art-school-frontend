import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useNewsStore = create((set, get) => ({
  loading: false,
  error: '',
  news: [],
  post: {},

  getNews: async () => {
    try {
      set(() => {
        return {
          loading: true,
        };
      });
      const response = await axios.get(`/news`);
      set(() => {
        return {
          news: response.data.items,
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
          error: error.message,
        };
      });
      throw new Error(error);
    }
  },

  getOnePost: async id => {
    try {
      set(() => {
        return {
          loading: true,
        };
      });
      const response = await axios.get(`/news/${id}`);
      set(() => {
        return {
          post: response.data,
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

  addPost: async data => {
    if (isDataValid(data)) {
      try {
        set(() => {
          return {
            loading: true,
          };
        });
        const response = await axios.post('/news', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        set(() => {
          return {
            loading: false,
          };
        });
        return response;
      } catch (error) {
        set(() => {
          return {
            loading: false,
          };
        });
        set(() => {
          if (error.response.data.detail === 'Unauthorized') {
            return {
              error: 'Помилка авторизації',
            };
          }
          return {
            error: 'Не вдалося виконати запит, спробуйте пізніше',
          };
        });
        setTimeout(() => {
          set(() => {
            return {
              error: '',
            };
          });
        }, 3000);
        throw new Error(error);
      }
    }
  },

  editPost: async (id, data) => {
    if (isDataValid(data)) {
      try {
        set(() => {
          return {
            loading: true,
          };
        });
        const response = await axios.patch(`/news/${id}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        set(() => {
          return {
            loading: false,
          };
        });
        return response;
      } catch (error) {
        set(() => {
          return {
            loading: false,
          };
        });
        set(() => {
          if (error.response.data.detail === 'Unauthorized') {
            return {
              error: 'Помилка авторизації',
            };
          }
          return {
            error: 'Не вдалося виконати запит, спробуйте пізніше',
          };
        });
        setTimeout(() => {
          set(() => {
            return {
              error: '',
            };
          });
        }, 3000);
        throw new Error(error);
      }
    }
  },

  deletePost: async id => {
    if (id) {
      try {
        set(() => {
          return {
            loading: true,
          };
        });
        const response = await axios.delete(`/news/${id}`);
        set(() => {
          return {
            news: get().news.filter(post => post.id !== id),
          };
        });
        set(() => {
          return {
            loading: false,
          };
        });
        return response;
      } catch (error) {
        set(() => {
          return {
            loading: false,
          };
        });
        set(() => {
          if (error.response.data.detail === 'Unauthorized') {
            return {
              error: 'Помилка авторизації',
            };
          }
          return {
            error: 'Не вдалося виконати запит, спробуйте пізніше',
          };
        });
        setTimeout(() => {
          set(() => {
            return {
              error: '',
            };
          });
        }, 3000);
        throw new Error(error);
      }
    }
  },
}));

export default useNewsStore;
