import { create } from 'zustand';

const usePostersStore = create((set, get) => ({
  server: import.meta.env.VITE_APP_API_URL,

  getPosters: async () => {
    const response = await fetch(`${get().server}/posters`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
  getPostersById: async id => {
    const response = await fetch(`${get().server}/posters/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
  addPoster: async data => {
    const newPost = {
      title: data.title,
      photo: data.image,
    };
    const response = await fetch(`${get().server}/posters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newPost,
    });
    const result = await response.json();
    return result;
  },
  updatePoster: async (data, id) => {
    const newPost = {
      title: data.title,
      photo: data.image,
    };
    const response = await fetch(`${get().server}/posters/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newPost,
    });

    const result = await response.json();
    return result;
  },

  deletePostersById: async id => {
    const response = await fetch(`${get().server}/posters/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  },
}));

export default usePostersStore;