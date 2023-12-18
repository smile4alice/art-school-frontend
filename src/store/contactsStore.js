import { create } from 'zustand';

const useContactsStore = create((set, get) => ({
  server: import.meta.env.VITE_APP_API_URL,

  getContacts: async () => {
    const response = await fetch(`${get().server}/contacts`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  editContact: async data => {
    const response = await fetch(`${get().server}/contacts`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
}));

export default useContactsStore;
