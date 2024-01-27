import { create } from 'zustand';
import axios from '@/utils/axios';
import { isDataValid } from '@/utils/formDataValidation';

const useAuthStore = create(set => ({
  loading: false,
  error: '',

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
            set(() => {
              if (error.code === 'ERR_BAD_REQUEST') {
                return {
                  error: 'Невірно введений пароль або електронна пошта',
                };
              }
            });
            setTimeout(() => {
              set(() => {
                return {
                  error: '',
                };
              });
            }, 8000);
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
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },

  resetPassword: async data => {
    if (data && !Object.values(data).includes(undefined)) {
      try {
        const response = await axios
          .post(`/auth/reset-password`, data, {})
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.log('Fetch error:', error.response.data.detail);
            set(() => {
              if (error.response.data.detail === 'RESET_PASSWORD_BAD_TOKEN') {
                return {
                  error:
                    'Посилання недійсне, надішліть запит для відновлення паролю повторно',
                };
              }
            });
            setTimeout(() => {
              set(() => {
                return {
                  error: '',
                };
              });
            }, 8000);
          });
        return response;
      } catch (error) {
        console.error(error);
      }
    }
  },

  changePassword: async data => {
    if (isDataValid(data)) {
      try {
        set(() => {
          return {
            loading: true,
          };
        });

        const requestData = new URLSearchParams(data);
        return await axios
          .post(`/auth/change-password`, requestData, {})
          .then(response => {
            console.log(response);
            set(() => {
              return {
                loading: false,
              };
            });
          })

          .catch(error => {
            console.log('Fetch error:', error.response.data.detail);
            set(() => {
              if (error.response.data.detail === 'Old password is incorrect.') {
                return {
                  error: 'Надісланий поточний пароль невірний',
                };
              }
              if (
                error.response.data.detail ===
                'Password should not contain e-mail.'
              ) {
                return {
                  error: 'Пароль має відрізнятись від логіна',
                };
              }
            });
            setTimeout(() => {
              set(() => {
                return {
                  error: '',
                };
              });
            }, 8000);
          });

        // console.log(response);
        // return response;
      } catch (error) {
        console.error(error);
      }
    }
  },
}));

export default useAuthStore;
