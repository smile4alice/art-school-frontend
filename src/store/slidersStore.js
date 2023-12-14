import { create } from 'zustand';

const useSlidersStore = create((set, get) => ({
  server: import.meta.env.VITE_APP_API_URL,

  getSlides: async () => {
    const response = await fetch(`${get().server}/slider_main`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  addSlide: async data => {
    const newSlide = {
      title: data.title,
      description: data.text,
      photo: data.image,
    };
    const response = await fetch(`${get().server}/slider_main`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSlide),
    });
    return response.json();
  },

  editSlide: async (id, data) => {
    let newSlide = {};
    if (data.image[0].size === 0) {
      newSlide = {
        title: data.title,
        description: data.text,
        photo: data.image[0].name,
      };
    } else {
      newSlide = {
        title: data.title,
        description: data.text,
        photo: data.image,
      };
    }
    const response = await fetch(`${get().server}/slider_main/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSlide),
    });
    return response.json();
  },

  deleteSlide: async id => {
    const response = await fetch(`${get().server}/slider_main/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
}));

export default useSlidersStore;
