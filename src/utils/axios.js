import axios from 'axios';

const instance = axios.create({
<<<<<<< HEAD
  //baseURL: import.meta.env.VITE_APP_API_URL,
  baseURL: 'https://verykivsky-art-school2.com.ua/api/v1/',
=======
 baseURL: import.meta.env.VITE_APP_API_URL,
 //baseURL: 'https://verykivsky-art-school2.com.ua/api/v1/',
>>>>>>> 0b441c6e6475568a4f9695cdd0cd469976857e4d
});

instance.interceptors.request.use(config => {
  const token = window.localStorage.getItem('access_token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
