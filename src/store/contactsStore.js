import { create } from 'zustand';
import axios from '@/utils/axios';

const useContactsStore = create(set => ({
  loading: false,
  contacts: {},

  getContacts: async () => {
    try {
      set(() => {
        return {
          loading: true,
        };
      });
      const response = await axios.get(`/contacts`);
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
    } catch (error) {
      throw new Error(error);
    }
  },

  editContact: async data => {
    const body = JSON.stringify(data);
    const response = await axios.patch('/contacts', body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  },
}));

export default useContactsStore;
