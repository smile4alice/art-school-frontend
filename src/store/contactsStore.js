import { create } from 'zustand';
import axios from '@/utils/axios';

const useContactsStore = create(set => ({
  contacts: {},

  getContacts: async () => {
    try {
      const response = await axios.get(`/contacts`);
      set(() => {
        return {
          contacts: response.data,
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
