import create from 'zustand';

const useServicesStore = create((set, get) => ({
  server: 'https://art-school-backend.vercel.app/api/v1/',
  getDepartments: async (id) => {
    const response = await fetch(`${get().server}departments/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
  getDepartmentAchievements: async (url, showSelect, departmentId) => {
    const response = await fetch(`${get().server}${url}${showSelect ? departmentId : ''}?page=1&size=7`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return showSelect ? result : result.items;
  },
}));

export default useServicesStore;

/*
getDepartmentAchievements

const useServicesStore = create(() => ({
  getDepartments: async () => {
    const response = await fetch(`https://art-school-backend.vercel.app/api/v1/departments/1`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
}));
*/
