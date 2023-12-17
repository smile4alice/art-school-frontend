import { create } from 'zustand';

const useAdministrationStore = create((set, get) => ({
  server: import.meta.env.VITE_APP_API_URL,

  getMembers: async () => {
    const response = await fetch(`${get().server}/school_administration`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  getOneMember: async id => {
    const response = await fetch(`${get().server}/school_administration/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  addMember: async data => {
    const newMember = {
      full_name: data.full_name,
      position: data.position,
      photo: data.image,
    };
    const response = await fetch(`${get().server}/school_administration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMember),
    });
    return response.json();
  },

  editMember: async (id, data) => {
    let newMember = {};
    if (data.image[0].size === 0) {
      newMember = {
        title: data.title,
        text: data.text,
        photo: data.image[0].name,
      };
    } else {
      newMember = {
        title: data.title,
        text: data.text,
        photo: data.image,
      };
    }
    const response = await fetch(
      `${get().server}/school_administration/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMember),
      }
    );
    return response.json();
  },

  deleteMember: async id => {
    const response = await fetch(
      `${get().server}/school_administration/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.json();
  },
}));

export default useAdministrationStore;
