import { create } from 'zustand';

const useServicesStore = create((set, get) => ({
  server: 'https://art-school-backend.vercel.app/api/v1/',
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
  getAllAchievements: async (page, size) => {
    const response = await fetch(
      `${get().server}achievements?page=${page}&size=${size}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.items;
  },
  //досягнення головної сторінки
  getMainAchievements: async () => {
    const response = await fetch(
      `${get().server}achievements?is_pinned=true&reverse=true&page=1&size=12`
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
      `${get().server}departments/${url}${departmentId}?page=1&size=40`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },
  // додати досягнення      achievements?pinned_position=1&sub_department=1&description=descrition4

  addAchievement: async data => {
    const achievementData = new FormData();
    achievementData.append('pinned_position', data.pinned_position);
    achievementData.append('sub_department', data.sub_department);
    achievementData.append('description', data.description);
    achievementData.append('media', data.media);

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
        `${get().server}achievements?${queryParams.toString()}`,
        {
          method: 'POST',
          body: achievementData,
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

  /*
  addAchievement: async data => {
    const achievementData = new FormData();
    achievementData.append('pinned_position', data.pinned_position);
    achievementData.append('sub_department', data.sub_department);
    achievementData.append('description', data.description);
    achievementData.append('media', data.media); 

    try {
      const response = await fetch(
        `${get().server}achievements?${
          data.pinned_position !== ''
            ? `pinned_position=${encodeURIComponent(data.pinned_position)}&`
            : ''
        }${
          data.sub_department !== ''
            ? `sub_department=${encodeURIComponent(data.sub_department)}&`
            : ''
        }description=${encodeURI(data.description)}`,
        {
          method: 'POST',
          body: achievementData,
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
*/
  //видалення досягнення
  deleteAchievement: async id => {
    const response = await fetch(`${get().server}/achievements/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
  //зміна досягнення
  putAchievement: async id => {
    const response = await fetch(`${get().server}/achievements/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  getAchievementsPositions: async () => {
    const response = await fetch(`${get().server}achievements/positions`);
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
