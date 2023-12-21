import { create } from 'zustand';

const useServicesStore = create((set, get) => ({
  server: 'https://art-school-backend.vercel.app/api/v1/',
  //server: import.meta.env.VITE_APP_API_URL,
  
  //отримати всі основні відділення
  getMainDepartments: async () => {
    const response = await fetch(`${get().server}departments`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
  //отримати всі відділи відділеннь по id основних відділень
  getSubDepartments: async id => {
    const response = await fetch(`${get().server}departments/${id}`); //id основного відділення від 1 до 6
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
  //всі досягнення
  getAllAchievements: async (url ,page, size) => {
    const response = await fetch(
      `${get().server}${url}?page=${page}&size=${size}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.items;
  },
  //досягнення головної сторінки
  getMainAchievements: async (url) => {
    const response = await fetch(
      `${get().server}${url}?is_pinned=true&reverse=true&page=1&size=20`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.items;
  },
  // досягнення відділу по id
  getDepartmentAchievements: async (url, departmentId) => {
    const response = await fetch(
      `${get().server}departments/sub_department_${url === 'achievements' ? 'achievement' : url}/${departmentId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
  //конкретне досягнення по id
  getAchievemenById: async (url, id) => {
    const response = await fetch(
      `${get().server}${url}/${id}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
  // додати досягнення      achievements?pinned_position=1&sub_department=1&description=descrition4
  addAchievement: async (url, data) => {
    const newAchievement = {
      pinned_position: data.pinned_position,
      sub_department: data.sub_department,
      description: data.description,
      media: data.media
    }
    const queryParams = new URLSearchParams();
    if (data.pinned_position !== '') {
      queryParams.append('pinned_position', data.pinned_position);
    }
    if (data.sub_department !== '') {
      queryParams.append('sub_department', data.sub_department);
    }
    queryParams.append('description', data.description);

    try {
      const response = await fetch(
        `${get().server}${url === 'gallery'? 'gallery/photo' : url}?${queryParams.toString()}`,
        {
          method: 'POST',
          header: {
            'accept': 'application/json', 
            'Content-Type': 'multipart/form-data'
          },
          body: JSON.stringify(newAchievement),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Achievement added successfully:', result);
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  },

  //видалення досягнення
  deleteAchievement: async (url, id) => {
    const response = await fetch(`${get().server}${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  //зміна досягнення
  editAchievement: async (url, id, data) => {
    const newAchievement = {
      pinned_position: data.pinned_position,
      sub_department: data.sub_department,
      description: data.description,
      media: data.media
    }
    const queryParams = new URLSearchParams();
    if (data.pinned_position !== '') {
      queryParams.append('pinned_position', data.pinned_position);
    }
    if (data.sub_department !== '') {
      queryParams.append('sub_department', data.sub_department);
    }
    queryParams.append('description', data.description);
    try {
    
      const response = await fetch(
        `${get().server}${url}/${id}?${queryParams.toString()}`,
        {
          method: 'PUT',
          header: {
            'accept': 'application/json', 
            'Content-Type': 'multipart/form-data'
          },
          body: JSON.stringify(newAchievement),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Achievement added successfully:', result);
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  },

  getAchievementsPositions: async (url) => {
    const response = await fetch(`${get().server}${url}/positions`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
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
