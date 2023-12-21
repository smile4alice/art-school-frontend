import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useAuthStore = create(() => ({
  login: async data => {
    try {
      if (isDataValid(data)) {
        const requestData = new URLSearchParams(data);
        await axios
          .post(`/auth/login`, requestData, {})
          .then(response => {
            const token = response.data.access_token;
            if (token) {
              window.localStorage.setItem('access_token', token);
            }
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  },

  sendMail: async data => {
    if (data.email !== undefined) {
      try {
        const response = await axios.post(`/auth/forgot-password`, data, {});
        console.log(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
  changePassword: async data => {
    try {
      if (isDataValid(data)) {
        const requestData = new URLSearchParams(data);
        await axios
          .post(`/auth/change-password`, requestData, {})
          .then(response => {
            return response;
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useAuthStore;
