import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useServicesStore = create((set, get) => ({
  departments: [],
  subDepartments: [],
  achievements: [],
  achievement: [],
  achievementsPositions: [],
  data: [],
  object: {},

  //отримати всі основні відділення
  getMainDepartments: async () => {
    const response = await axios.get('departments');
    try {
      set(() => {
        return {
          departments: response.data,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  //отримати всі відділи відділень по id основних відділень
  getSubDepartments: async id => {
    const response = await axios.get(`departments/${id}`);
    try {
      set(() => {
        return {
          subDepartments: response.data,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  //всі досягнення
  getAllAchievements: async (url, page, size) => {
    const response = await axios.get(`/${url}?page=${page}&size=${size}`);
    try {
      set(() => {
        return {
          achievements: response.data.items,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  //досягнення головної сторінки
  getMainAchievements: async url => {
    const response = await axios.get(
      `/${url}?is_pinned=true&reverse=true&page=1&size=20`
    );
    try {
      set(() => {
        return {
          achievements: response.data.items,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  // досягнення відділу по id
  getDepartmentAchievements: async (url, id) => {
    const response = await axios.get(
      `/departments/sub_department_${
        url === 'achievements' ? 'achievement' : url
      }/${id}`
    );
    try {
      set(() => {
        return {
          achievements: response.data,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  //конкретне досягнення по id
  getAchievemenById: async (url, id) => {
    try {
      const response = await axios.get(`/${url}/${id}`);
      set(() => {
        return {
          achievement: response.data,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  // додати досягнення
  addAchievement: async (url, achievements) => {
    if (isDataValid(achievements)) {
      const queryParams = new URLSearchParams();
      if (achievements.pinned_position !== '') {
        queryParams.append('pinned_position', achievements.pinned_position);
      }
      if (achievements.sub_department !== '') {
        queryParams.append('sub_department', achievements.sub_department);
      }
      queryParams.append('description', achievements.description);
      try {
        const response = await axios.post(
          `/${
            url === 'gallery' ? 'gallery/photo' : url
          }?${queryParams.toString()}`,
          achievements,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  //зміна досягнення
  editAchievement: async (url, id, data) => {
    if (isDataValid(data)) {
      const queryParams = new URLSearchParams();
      if (data.pinned_position !== '') {
        queryParams.append('pinned_position', data.pinned_position);
      }
      if (data.sub_department !== '') {
        queryParams.append('sub_department', data.sub_department);
      }
      queryParams.append('description', data.description);

      try {
        const response = await axios.put(
          `/${
            url === 'gallery' ? 'gallery/photo' : url
          }/${id}?${queryParams.toString()}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  //видалення досягнення
  deleteAchievement: async (url, id) => {
    const response = await axios.delete(`/${url}/${id}`);
    set(() => {
      return {
        data: get().data.filter(object => object.id !== id),
      };
    });
    return response;
  },
  //Позиції досягнень головної сторінки
  getAchievementsPositions: async url => {
    const response = await axios.get(`/${url}/positions`);
    try {
      set(() => {
        return {
          achievementsPositions: response.data,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  getAdministrationData: async () => {
    try {
      const response = await axios.get(`/school_administration`);
      set(() => {
        return {
          members: response.data,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },
}));

export default useServicesStore;
