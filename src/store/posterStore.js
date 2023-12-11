import { create } from 'zustand';

const usePostersStore = create((set, get) => ({
  // server: import.meta.env.VITE_APP_API_URL,
  server: 'https://art-school-backend.vercel.app/api/v1/',

  getPosters: async () => {
    //const response = await fetch( `${ get().server }posters` );
    const response = await fetch(`${get().server}news`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
  getPostersById: async id => {
    //const response = await fetch(`${get().server}posters/${id}`);
    const response = await fetch(`${get().server}news/${id}`);
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
    const response = await fetch(`${get().server}posters`, {
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
    const response = await fetch(`${get().server}posters/${id}`, {
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
    const response = await fetch(`${get().server}posters/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  },
}));

export default usePostersStore;
