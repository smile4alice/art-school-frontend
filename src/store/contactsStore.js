import { create } from 'zustand';
import axios from '@/utils/axios';
import { stringifyObj } from '@/utils/stringifyObj';

const useContactsStore = create(set => ({
  loading: false,
  error: '',
  contacts: {},
  isAuthorized: true,

  getContacts: async () => {
    try {
      set(() => {
        return {
          loading: true,
        };
      });
      const response = await axios.get(`/contacts`);
      if (response.status === 200) {
        set(() => {
          return {
            contacts: response.data,
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
      throw new Error(error);
    }
  },

  editContact: async data => {
    try {
      set(() => {
        return {
          loading: true,
        };
      });
      const body = stringifyObj(data);
      const response = await axios.patch('/contacts', body, {
        headers: {
          'Content-Type': 'application/json',
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
  },
}));

export default useContactsStore;
