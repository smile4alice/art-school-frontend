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
    const response = await fetch(`${get().server}departments/${id}`);//id основного відділення від 1 до 6
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },




  
  //admin Achievements
  //всі досягнення
  getAllAchievements: async () => {
    const response = await fetch(
      `${get().server}achievements`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result.items;
  },

  //досягнення головної сторінки переробити
  getMainAchievements: async (url, departmentId, page, pageSize) => {
    const response = await fetch(
      `${get().server}${url}${url !== 'achievements' ? departmentId : ''}?page=${page}&size=${pageSize}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return url !== 'achievements' ? result : result.items;
  },
  //досягнення відділу по id
  getDepartmentAchievementsId: async ( id, page, pageSize ) => {
    const response = await fetch(`${get().server}departments/sub_department_achievement/${id}?page=${page}&size=${pageSize}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  },





  //додати досягнення треба переробити, оскільки досягнення додаються на головну сторінку та в відділ
  addAchievement: async data => {///api/v1/achievements
    const achievementPost = {
      title: data.title,
      text: data.text,
      photo: data.image,
    };
    const response = await fetch(`${get().server}/achievements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: achievementPost,
    });
    return response.json();
  },



  // для компоненту досягнення основної сторінки та в відділеннях --- потрібно переробити?
  getDepartmentAchievements: async (url, departmentId) => {
    const response = await fetch(
      `${get().server}${url}${url !== 'achievements' ? departmentId : ''}?page=1&size=12`
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
