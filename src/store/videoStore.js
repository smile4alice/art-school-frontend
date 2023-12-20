import { create } from 'zustand';

const useVideoStore = create((set, get) => ({
  server: 'https://art-school-backend.vercel.app/api/v1',

  getAllVideo: async () => {
    const response = await fetch(`${get().server}/video?reverse=true&page=1&size=50`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  getOneVideo: async id => {
    const response = await fetch(`${get().server}/gallery/video/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  addVideo: async data => {
    const newVideo = {
      media: data.media,
    };
    console.log(data);
    const response = await fetch(`${get().server}/gallery/video?media=${data.media}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVideo),
    });
    return response.json();
  },

  editVideo: async (id, data) => {//передивитись
    const newVideo = {
        media: data.media,
      }; 
    const response = await fetch(`${get().server}/gallery/video/${id}?media=${data.media}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newVideo),
    });
    return response.json();
  },

  deleteVideo: async id => {
    const response = await fetch(`${get().server}/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
}));

export default useVideoStore;
