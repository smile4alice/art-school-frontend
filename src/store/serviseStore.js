import { create } from 'zustand';

const useServicesStore = create((set, get) => ({
  server: 'https://art-school-backend.vercel.app/api/v1/',

  getDepartments: async id => {
    const response = await fetch(`${get().server}departments/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log('result: ', result);
    return result;
  },

  getDepartmentAchievements: async (url, showSelect, departmentId) => {
    const response = await fetch(
      `${get().server}${url}${showSelect ? departmentId : ''}?page=1&size=7`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return showSelect ? result : result.items;
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
