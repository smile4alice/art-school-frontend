import { create } from 'zustand';
import axios from '@/utils/axios';
import { stringifyObj } from '@/utils/stringifyObj';

const useContactsStore = create(set => ({
  loading: false,
  error: {},
  contacts: {},

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
      set(() => {
        return {
          error: error,
        };
      });
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
      throw new Error(error);
    }
  },
}));

export default useContactsStore;
