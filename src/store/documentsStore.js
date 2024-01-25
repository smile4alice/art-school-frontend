import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useDocumentsStore = create((set, get) => ({
  loading: false,
  error: '',
  documents: [],
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
          if (error.code === 'ERR_BAD_REQUEST') {
            return {
              error: 'Документ з цією назвою вже існує, спробуйте іншу назву',
            };
          }
        });
        setTimeout(() => {
          set(() => {
            return {
              error: '',
            };
          });
        }, 5000);
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
          if (error.code === 'ERR_BAD_REQUEST') {
            return {
              error: 'Документ з цією назвою вже існує, спробуйте іншу назву',
            };
          }
        });
        setTimeout(() => {
          set(() => {
            return {
              error: '',
            };
          });
        }, 5000);
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
        throw new Error(error);
      }
    }
  },
}));

export default useDocumentsStore;
