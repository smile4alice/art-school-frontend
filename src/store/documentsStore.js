import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useDocumentsStore = create((set, get) => ({
  loading: false,
  error: '',
  documents: [],
  isAuthorized: true,

  getApplication: async () => {
    try {
      const response = await axios.get(`/documents?is_pinned=true`);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getDocuments: async () => {
    try {
      set(() => {
        return {
          loading: true,
        };
      });
      const response = await axios.get(`/documents`);
      if (response.status === 200) {
        set(() => {
          return {
            documents: response.data,
          };
        });
        set(() => {
          return {
            loading: false,
          };
        });
      }
      return response;
    } catch (error) {
      set(() => {
        return {
          error: error,
        };
      });
      throw new Error(error);
    }
  },

  addDocument: async data => {
    if (isDataValid(data)) {
      try {
        set(() => {
          return {
            loading: true,
          };
        });
        const response = await axios.post('/documents', data, {
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
          if (error.code === 'ERR_BAD_REQUEST') {
            return {
              error: 'Документ з такою назвою вже існує, спробуйте іншу назву',
            };
          }
          return {
            error: 'Не вдалося виконати запит, спробуйте пізніше',
          };
        });
        setTimeout(() => {
          if (error.response.data.detail === 'Unauthorized') {
            set(() => {
              return {
                isAuthorized: false,
              };
            });
          }
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

  editDocument: async (data, id) => {
    if (isDataValid(data)) {
      try {
        set(() => {
          return {
            loading: true,
          };
        });
        const response = await axios.patch(`/documents/${id}`, data, {
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
          if (error.code === 'ERR_BAD_REQUEST') {
            return {
              error: 'Документ з такою назвою вже існує, спробуйте іншу назву',
            };
          }
          return {
            error: 'Не вдалося виконати запит, спробуйте пізніше',
          };
        });
        setTimeout(() => {
          if (error.response.data.detail === 'Unauthorized') {
            set(() => {
              return {
                isAuthorized: false,
              };
            });
          }
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

  deleteDocument: async id => {
    if (id) {
      try {
        set(() => {
          return {
            loading: true,
          };
        });
        const response = await axios.delete(`/documents/${id}`);
        set(() => {
          return {
            documents: get().documents.filter(doc => doc.id !== id),
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
          if (error.response.data.detail === 'Unauthorized') {
            set(() => {
              return {
                isAuthorized: false,
              };
            });
          }
          set(() => {
            return {
              error: '',
            };
          });
        }, 3000);
        setTimeout(() => {
          set(() => {
            return {
              isAuthorized: true,
            };
          });
        }, 5000);
        throw new Error(error);
      }
    }
  },
}));

export default useDocumentsStore;
