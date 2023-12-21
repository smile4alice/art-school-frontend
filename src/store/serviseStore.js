import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useServicesStore = create((set) => ({
  departments: [],
  subDepartments: [],
  achievements: [],
  gallery: [],
  achievementsPositions: [],
  achievement: {},
  
  //отримати всі основні відділення
  getMainDepartments: async () => {
    const response = await axios.get('/departments');
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
    const response = await axios.get(`/departments/${id}`);
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
    try {
      const response = await axios.get(`/${url}?page=${page}&size=${size}`);
      set(() => {
        if(url === 'gallery'){
          return {
            gallery: response.data.items,
          };
        }else{
          return {
            achievements: response.data.items,
          };
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  //досягнення головної сторінки
  getMainAchievements: async url => {
    try {
      const response = await axios.get(
        `/${url}?is_pinned=true&reverse=true&page=1&size=20`
      );
      set(() => {
        if(url === 'gallery'){
          return {
            gallery: response.data.items,
          };
        }else{
          return {
            achievements: response.data.items,
          };
        }
      });
    } catch (error) {
      throw new Error(error);
    }
  },
  // досягнення відділу по id
  getDepartmentAchievements: async (url, id) => {
    try {
      const response = await axios.get(
        `/departments/sub_department_${
          url === 'achievements' ? 'achievement' : url
        }/${id}`
      );
      set(() => {
        if(url === 'gallery'){
          return {
            gallery: response.data.items,
          };
        }else{
          return {
            achievements: response.data.items,
          };
        }
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
  addAchievement: async (url, data) => {
    try {
      if (isDataValid(data)) {
        const queryParams = new URLSearchParams();
        if (data.get('pinned_position') !== '') {
          queryParams.append('pinned_position', data.get('pinned_position'));
        }
        if (data.get('sub_department') !== '') {
          queryParams.append('sub_department', data.get('sub_department'));
        }
        if (data.get('description') !== '') {
          queryParams.append('description', data.get('description'));
        }
        const response = await axios.post(
          `/${
            url === 'gallery' ? 'gallery/photo' : url
          }?${queryParams.toString()}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  //зміна досягнення
  editAchievement: async (url, id, data) => {
    try {
      if (isDataValid(data)) {
        const queryParams = new URLSearchParams();
        if (data.get('pinned_position') !== '') {
          queryParams.append('pinned_position', data.get('pinned_position'));
        } 
        if (data.get('sub_department') !== '') {
          queryParams.append('sub_department', data.get('sub_department'));
        }
        if (data.get('description') !== '') {
          queryParams.append('description', data.get('description'));
        }
        const response = await axios.put(
          `/${url === 'gallery' ? 'gallery/photo' : url}/${id}?${queryParams.toString()}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response;
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  //видалення досягнення
  deleteAchievement: async (url, id) => {
    try {
      const response = await axios.delete(`/${url}/${id}`);
      if(url === 'gallery'){
        set(state => ({
          gallery: state.gallery.filter(item => item.id !== id),
        }));
      }else{
        set(state => ({
          achievements: state.achievements.filter(item => item.id !== id),
        }));
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },
  //Позиції досягнень головної сторінки
  getAchievementsPositions: async url => {
    try {
      const response = await axios.get(`/${url}/positions`);
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
