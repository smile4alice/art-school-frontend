import { create } from 'zustand';

const useNewsStore = create((set, get) => ({
  server: import.meta.env.VITE_APP_API_URL,

  getNews: async () => {
    const response = await fetch(`${get().server}/news`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  getOnePost: async id => {
    const response = await fetch(`${get().server}/news/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  addPost: async data => {
    const newPost = {
      title: data.title,
      text: data.text,
      photo: data.image,
    };
    const response = await fetch(`${get().server}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    return response.json();
  },

  editPost: async (id, data) => {
    let newPost = {};
    if (data.image[0].size === 0) {
      newPost = {
        title: data.title,
        text: data.text,
        photo: data.image[0].name,
      };
    } else {
      newPost = {
        title: data.title,
        text: data.text,
        photo: data.image,
      };
    }
    const response = await fetch(`${get().server}/news/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    return response.json();
  },

  deletePost: async id => {
    const response = await fetch(`${get().server}/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
}));

export default useNewsStore;
