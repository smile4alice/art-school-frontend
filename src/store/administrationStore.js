import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useAdministrationStore = create((set, get) => ({
  members: [],
  member: {},

  getMembers: async () => {
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

  getOneMember: async id => {
    try {
      const response = await axios.get(`/school_administration/${id}`);
      set(() => {
        return {
          member: response.data,
        };
      });
    } catch (error) {
      throw new Error(error);
    }
  },

  addMember: async data => {
    if (isDataValid(data)) {
      try {
        const response = await axios.post('/school_administration', data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response;
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  editMember: async (id, data) => {
    if (isDataValid(data)) {
      try {
        const response = await axios.patch(
          `/school_administration/${id}`,
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

  deleteMember: async id => {
    const response = await axios.delete(`/school_administration/${id}`);
    set(() => {
      return {
        members: get().members.filter(member => member.id !== id),
      };
    });
    return response;
  },
}));

export default useAdministrationStore;
