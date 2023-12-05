import { create } from 'zustand';

const useServicesStore = create((set, get) => ({
  server: 'https://art-school-backend.vercel.app/api/v1/',

  getDepartments: async id => {
    const response = await fetch(`${get().server}departments/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },

  getDepartmentAchievements: async (url, departmentId) => {
    const response = await fetch(
      `${get().server}${url}${url !== 'achievements' ? departmentId : ''}?page=1&size=7`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return url !== 'achievements' ? result : result.items;
  },

  getAdministrationData: async () => {
    const response = await fetch(`${get().server}school_administration`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
}));

export default useServicesStore;
