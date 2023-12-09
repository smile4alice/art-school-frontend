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
      body: newPost,
    });
    return response.json();
  },
}));

export default useNewsStore;
